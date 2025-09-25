import { useOptimistic } from "react";

/**
 * General optimistic list reducer hook.
 * 
 * Actions:
 *  - swapTwo: { type: "swapTwo", id1, id2 }
 *  - replaceOne: { type: "replaceOne", id, item }
 *  - replaceMany: { type: "replaceMany", items } // update multiple items by id
 *  - addLast: { type: "addLast", item }
 *  - insertAt: { type: "insertAt", index, item }
 *  - removeOne: { type: "removeOne", id }
 *  - updateAll: { type: "updateAll", items }
 *  - reset: { type: "reset" }
 */
export function useOptimisticHook(initial = []) {
  const [optimistic, dispatch] = useOptimistic(initial, (current, action) => {
    console.log("inside optimistic hook: ",action.type)
    switch (action.type) {
      case "swapTwo": {
        const { id1, id2 } = action;
        const arr = [...current];
        const idx1 = arr.findIndex((i) => i.id === id1);
        const idx2 = arr.findIndex((i) => i.id === id2);
        if (idx1 === -1 || idx2 === -1) return current;
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
        return arr;
      }

      case "replaceOne": {
        const { id, item } = action;
        console.log( id, item )
        return current.map((i) => (i.id === id ? { ...i, ...item } : i));
      }

      //   case "replaceMany": {
      //     const map = new Map(action.items.map((i) => [i.id, i]));
      //     return current.map((i) => (map.has(i.id) ? { ...i, ...map.get(i.id) } : i));
      //   }
      
      case "reorderList": {
        const { activeId, overId } = action;
        const arr = [...current];
        const oldIndex = arr.findIndex((i) => i.id === activeId);
        const newIndex = arr.findIndex((i) => i.id === overId);

        if (oldIndex === -1 || newIndex === -1) return current;

        // move the job
        const [moved] = arr.splice(oldIndex, 1);
        arr.splice(newIndex, 0, moved);

        // reassign order
        const reordered = arr.map((job, idx) => ({
          ...job,
          order: idx + 1,
        }));

        const sorted = [...reordered].sort((a,b)=>(a.order - b.order));
        
        
        console.log("[optimisticHook → reorderList] before reorder:", current);
        console.log("[optimisticHook → reorderList] after reorder:", sorted);
        return sorted
      }


      case "addLast": {
        return [...current, action.item];
      }
      case "prependOne": {
        return [action.item, ...current];
      }

      case "insertAt": {
        const { index, item } = action;
        const arr = [...current];
        arr.splice(index, 0, item);
        return arr;
      }

      case "removeOne": {
        return current.filter((i) => i.id !== action.id);
      }

      case "updateAll": {
        return [...action.items];
      }

      case "reset": {
        return [...initial];
      }

      default:
        return current;
    }
  });

  return [optimistic, dispatch];
}
