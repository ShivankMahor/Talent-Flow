import React, {useState} from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

/* Simple presentational item (ref-forwarding pattern recommended for overlays) */
const Item = React.forwardRef(({id, style, listeners, attributes}, ref) => (
  <div ref={ref} style={{padding: 8, border: '1px solid #ddd', marginBottom: 8, background: '#fff', ...style}} {...listeners} {...attributes}>
    {id}
  </div>
));

function SortableItem({id}) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return <Item ref={setNodeRef} id={id} style={style} listeners={listeners} attributes={attributes} />;
}

export default function MultiContainerVirtualExample() {
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeId, setActiveId] = useState(null);

  // two containers with arrays of ids
  const [containers, setContainers] = useState({
    left: ['L-1', 'L-2', 'L-3'],
    right: ['R-1', 'R-2', 'R-3'],
  });

  function findContainer(id) {
    return Object.keys(containers).find(key => containers[key].includes(id));
  }

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const {active, over} = event;
    setActiveId(null);

    if (!over) return;

    const fromId = findContainer(active.id);
    const toId = findContainer(over.id);

    if (fromId == null || toId == null) return;

    // if same container -> reorder
    if (fromId === toId) {
      setContainers(prev => ({
        ...prev,
        [fromId]: arrayMove(prev[fromId], prev[fromId].indexOf(active.id), prev[fromId].indexOf(over.id)),
      }));
      return;
    }

    // move between containers
    setContainers(prev => {
      const from = [...prev[fromId]];
      const to = [...prev[toId]];
      from.splice(from.indexOf(active.id), 1);
      const insertAt = to.indexOf(over.id);
      to.splice(insertAt === -1 ? to.length : insertAt, 0, active.id);
      return {...prev, [fromId]: from, [toId]: to};
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={{display: 'flex', gap: 16}}>
        {/* Left container */}
        <SortableContext items={containers.left} strategy={verticalListSortingStrategy}>
          <div style={{width: 200, padding: 8, background: '#f6f6f6'}}>
            {containers.left.map(id => <SortableItem key={id} id={id} />)}
          </div>
        </SortableContext>

        {/* Right container */}
        <SortableContext items={containers.right} strategy={verticalListSortingStrategy}>
          <div style={{width: 200, padding: 8, background: '#f6f6f6'}}>
            {containers.right.map(id => <SortableItem key={id} id={id} />)}
          </div>
        </SortableContext>
      </div>

      {/* Always-mounted overlay. Render a presentational Item for the active id. */}
      <DragOverlay>
        {activeId ? <Item id={activeId} style={{boxShadow: '0 4px 12px rgba(0,0,0,0.15)'}} /> : null}
      </DragOverlay>
    </DndContext>
  );
}