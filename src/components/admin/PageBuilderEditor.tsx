"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BLOCK_DEFS } from "@/lib/blocks/schemas";
import { BLOCK_TYPES, type Block, type BlockType } from "@/lib/blocks/types";
import { BlockFieldsEditor } from "@/components/admin/BlockFieldsEditor";

function SortableBlockCard({
  block,
  isOpen,
  onToggleOpen,
  onEdit,
  onDelete,
  onToggleHidden,
}: {
  block: Block;
  isOpen: boolean;
  onToggleOpen: () => void;
  onEdit: (next: Record<string, unknown>) => void;
  onDelete: () => void;
  onToggleHidden: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : block.hidden ? 0.6 : 1,
    ...(block.hidden ? { borderStyle: "dashed" as const } : {}),
  };
  const def = BLOCK_DEFS[block.type];

  return (
    <div ref={setNodeRef} style={style} className="card p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="text-muted shrink-0 select-none text-lg"
            style={{ cursor: "grab", touchAction: "none" }}
            aria-label="Drag to reorder"
          >
            ⠿
          </button>
          <div>
            <p className="m-0 text-sm font-semibold">
              {def.label} {block.hidden && <span className="text-muted font-normal">(hidden)</span>}
            </p>
            <p className="text-muted m-0 text-xs">{def.description}</p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" className="btn btn-secondary" onClick={onToggleHidden}>
            {block.hidden ? "Show" : "Hide"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onToggleOpen}>
            {isOpen ? "Collapse" : "Edit"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="mt-4 border-t pt-4" style={{ borderColor: "var(--color-divider)" }}>
          <BlockFieldsEditor fields={def.fields} props={block.props} onChange={onEdit} />
        </div>
      )}
    </div>
  );
}

export function PageBuilderEditor({ pageKey }: { pageKey: string }) {
  const router = useRouter();
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [addType, setAddType] = useState<BlockType>("richText");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => {
    fetch(`/api/admin/page-blocks/${pageKey}`)
      .then((r) => r.json())
      .then((data) => {
        setBlocks(Array.isArray(data.blocks) ? data.blocks : []);
        setDirty(false);
      });
  }, [pageKey]);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setDirty(true);
    setBlocks((bs) => {
      if (!bs) return bs;
      const oldIndex = bs.findIndex((b) => b.id === active.id);
      const newIndex = bs.findIndex((b) => b.id === over.id);
      return arrayMove(bs, oldIndex, newIndex);
    });
  }

  function updateBlockProps(id: string, next: Record<string, unknown>) {
    setDirty(true);
    setBlocks((bs) => bs && bs.map((b) => (b.id === id ? { ...b, props: next } : b)));
  }

  function toggleHidden(id: string) {
    setDirty(true);
    setBlocks((bs) => bs && bs.map((b) => (b.id === id ? { ...b, hidden: !b.hidden } : b)));
  }

  function deleteBlock(id: string) {
    if (!confirm("Remove this section from the page? Click “Save Changes” afterwards to make it stick.")) return;
    setDirty(true);
    setBlocks((bs) => bs && bs.filter((b) => b.id !== id));
  }

  function addBlock() {
    const def = BLOCK_DEFS[addType];
    const newBlock: Block = { id: `${addType}-${Date.now()}`, type: addType, props: { ...def.defaultProps } };
    setDirty(true);
    setBlocks((bs) => [...(bs ?? []), newBlock]);
    setOpenId(newBlock.id);
  }

  async function handleSave() {
    if (!blocks) return;
    setStatus("saving");
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/page-blocks/${pageKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blocks),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        const raw = data.message ?? "Failed to save.";
        setMessage(
          /page_blocks/i.test(raw)
            ? "Setup isn't finished yet — ask your developer to run the latest database migration (supabase/schema.sql), then try saving again."
            : raw
        );
        return;
      }
      setStatus("saved");
      setMessage("Saved. Changes are live on the site now.");
      setDirty(false);
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server.");
    }
  }

  if (!blocks) return <p className="text-muted text-sm">Loading…</p>;

  return (
    <div className="pb-24">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-3">
            {blocks.map((block) => (
              <SortableBlockCard
                key={block.id}
                block={block}
                isOpen={openId === block.id}
                onToggleOpen={() => setOpenId(openId === block.id ? null : block.id)}
                onEdit={(next) => updateBlockProps(block.id, next)}
                onDelete={() => deleteBlock(block.id)}
                onToggleHidden={() => toggleHidden(block.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {blocks.length === 0 && <p className="card p-6 text-sm">No sections on this page yet — add one below.</p>}

      <div className="card mt-6 flex items-end gap-3 p-4">
        <div className="field m-0">
          <label htmlFor="addType">Add a section</label>
          <select id="addType" className="input" value={addType} onChange={(e) => setAddType(e.target.value as BlockType)}>
            {BLOCK_TYPES.map((t) => (
              <option key={t} value={t}>
                {BLOCK_DEFS[t].label}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-secondary" onClick={addBlock}>
          + Add Section
        </button>
      </div>

      {message && (
        <p className="mt-4 text-sm font-medium" style={{ color: status === "error" ? "#b3261e" : "var(--color-accent)" }}>
          {message}
        </p>
      )}

      {/* Sticky action bar so Save is always reachable, no matter how long the page is. */}
      <div
        className="sticky bottom-0 z-10 -mx-1 mt-6 flex items-center gap-3 border-t px-1 py-3"
        style={{ background: "var(--color-bg)", borderColor: "var(--color-divider)" }}
      >
        <button type="button" className="btn btn-primary" onClick={handleSave} disabled={status === "saving" || !dirty}>
          {status === "saving" ? "Saving…" : dirty ? "Save Changes" : "Saved"}
        </button>
        {dirty && (
          <span className="text-xs font-medium" style={{ color: "#b3261e" }}>
            You have unsaved changes
          </span>
        )}
      </div>
    </div>
  );
}
