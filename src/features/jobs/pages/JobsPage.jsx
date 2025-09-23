// \src\features\jobs\pages\JobsPage.jsx

import { useJobs } from "../context/JobsContext";
import Navbar from "../../../components/Navbar";
import JobsToolbar from "../components/JobsToolbar";
import JobsListCards from "../components/JobListCards";
import JobsPagination from "../components/JobsPagination";
import Modal from "../../../components/Modal";
import JobForm from "../components/JobForm";

export default function JobsPage() {
  const {
    optimisticJobs,
    filters,
    setFilters,
    page,
    setPage,
    total,
    tags,
    handleReorder,
    closeEditModal,
    selectedJob,
    openEdit,
    handleEdit
  } = useJobs();

  return (
    <div>
      <Navbar />
      <div className="p-4 space-y-2">
        <JobsToolbar />
        <JobsListCards jobs={optimisticJobs} onReorder={handleReorder} />
        <JobsPagination page={page} total={total} pageSize={10} onPageChange={setPage} />
        {/* Edit Modal */}
        <Modal open={openEdit} onClose={closeEditModal} title="Edit Job">
          <JobForm
            initialData={selectedJob}
            onSubmit={(updates) => handleEdit(selectedJob.id, updates)}
            onCancel={closeEditModal}
          />
        </Modal>
      </div>
    </div>
  );
}
