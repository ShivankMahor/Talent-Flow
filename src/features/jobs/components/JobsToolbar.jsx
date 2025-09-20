// features/jobs/components/JobsToolbar.jsx
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

export default function JobsToolbar({ filters, onChangeFilters, allTags = [] }) {
  console.log("Tags",allTags)
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex space-x-1.5">
        {/* Search (title + tags) */}
        <Input
          placeholder="Search jobs (title or tag)..."
          value={filters.search}
          onChange={(e) => onChangeFilters({ ...filters, search: e.target.value })}
          className="flex-1"
        />

        {/* Status filter */}
        <Select
          value={filters.status}
          onChange={(e) => onChangeFilters({ ...filters, status: e.target.value })}
          options={[
            { value: "", label: "All Statuses" },
            { value: "active", label: "Active" },
            { value: "archived", label: "Archived" },
            { value: "closed", label: "Closed" }
          ]}
        />

        {/* Tag filter */}
        <Select
          value={filters.tag || ""}
          onChange={(e) => onChangeFilters({ ...filters, tag: e.target.value })}
          options={[
            { value: "", label: "All Tags" },
            ...allTags.map((tag) => ({ value: tag, label: tag }))
          ]}
        />
      </div>
      {/* Create Job */}
      <Button onClick={() => alert("TODO: open JobFormModal")}>+ Create Job</Button>
    </div>
  );
}
