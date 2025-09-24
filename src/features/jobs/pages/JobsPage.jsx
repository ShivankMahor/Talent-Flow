// \src\features\jobs\pages\JobsPage.jsx

import { useJobs } from "../context/JobsContext";
import Navbar from "../../../components/Navbar";
import JobsToolbar from "../components/JobsToolbar";
import JobsListCards from "../components/JobListCards";
import Modal from "../../../components/Modal";
import JobForm from "../components/JobForm";
import Card from "../../../components/Card";
import Pagination from "../../../components/Pagination";

export default function JobsPage() {
  const {
    page,
    setPage,
    total,
    closeEditModal,
    selectedJob,
    openEdit,
    handleEdit,
    pageSize
  } = useJobs();

  return (
    <div className="bg-[var(--color-surface-alt)]">
      <Navbar />
      <Card className="m-4">
        <JobsToolbar />
        <div className="border-b w-full -mx-4 mb-4 -mt-2 border-[var(--color-border)]"></div>
        <JobsListCards/>
        <Pagination page={page} totalPages={Math.ceil(total / pageSize)} onChange={setPage} />
        {/* Edit Modal */}
        <Modal open={openEdit} onClose={closeEditModal} title="Edit Job">
          <JobForm
            initialData={selectedJob}
            onSubmit={(updates) => handleEdit(selectedJob.id, updates)}
            onCancel={closeEditModal}
          />
        </Modal>
      </Card>
    </div>
  );
}
