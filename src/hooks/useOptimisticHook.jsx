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
      
      case "updateTwoJobs": {
        const map = new Map(action.items.map((i) => [i.id, i]));
        const temp = current.map((i) =>
          map.has(i.id) ? { ...i, ...map.get(i.id) } : i
        );
        console.log("Data inside the useOptismistic: ",temp)
        return [...temp].sort((a,b)=> a.order - b.order)
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
