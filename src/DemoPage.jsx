import Button from "./components/Button";
import Input from "./components/Input";
import Textarea from "./components/Textarea";
import Select from "./components/Select";
import Checkbox from "./components/Checkbox";
import Modal from "./components/Modal";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Badge from "./components/Badge";
import Card from "./components/Card";
import Loader from "./components/Loader";
import EmptyState from "./components/EmptyState";

import { useState } from "react";

export default function DemoPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const tableColumns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
  ];
  const tableData = [
    { id: 1, name: "Alice", email: "alice@test.com" },
    { id: 2, name: "Bob", email: "bob@test.com" },
  ];

  return (
    <div className="p-6 space-y-8 bg-[var(--color-background)] min-h-screen text-[var(--color-text)]">
      <h1 className="text-2xl font-bold">Component Demo</h1>

      {/* Buttons */}
      <section>
        <h2 className="font-semibold mb-2">Buttons</h2>
        <div className="flex gap-3 flex-wrap">
          <Button>Primary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="font-semibold mb-2">Form Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Name" placeholder="Enter your name" />
          <Input label="Email" type="email" placeholder="email@test.com" error="Invalid email" />
          <Textarea label="Description" placeholder="Type something..." />
          <Select
            label="Role"
            options={[
              { value: "admin", label: "Admin" },
              { value: "hr", label: "HR" },
              { value: "candidate", label: "Candidate" },
            ]}
          />
          <Checkbox label="Accept Terms" />
        </div>
      </section>

      {/* Modal */}
      <section>
        <h2 className="font-semibold mb-2">Modal</h2>
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Sample Modal"
          footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
        >
          <p>This is a reusable modal component.</p>
        </Modal>
      </section>

      {/* Table */}
      <section>
        <h2 className="font-semibold mb-2">Table + Pagination</h2>
        <Table columns={tableColumns} data={tableData} />
        <Pagination page={page} totalPages={5} onChange={setPage} />
      </section>

      {/* Badges */}
      <section>
        <h2 className="font-semibold mb-2">Badges</h2>
        <div className="flex gap-2">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </section>

      {/* Card */}
      <section>
        <h2 className="font-semibold mb-2">Card</h2>
        <Card>
          <Card variant="default">
            <h3 className="text-lg font-medium">Job Card</h3>
            <p className="text-[var(--color-text-muted)]">Frontend Developer role with React & Tailwind</p>
            <Button size="sm" className="mt-2">Apply Now</Button>
          </Card>
          <Card variant="elevated">
            <h3 className="text-lg font-medium">Job Card</h3>
            <p className="text-[var(--color-text-muted)]">Frontend Developer role with React & Tailwind</p>
            <Button size="sm" className="mt-2">Apply Now</Button>
          </Card>
          <Card variant="flat">
            <h3 className="text-lg font-medium">Job Card</h3>
            <p className="text-[var(--color-text-muted)]">Frontend Developer role with React & Tailwind</p>
            <Button size="sm" className="mt-2">Apply Now</Button>
          </Card>
          <Card variant="outlined">
            <h3 className="text-lg font-medium">Job Card</h3>
            <p className="text-[var(--color-text-muted)]">Frontend Developer role with React & Tailwind</p>
            <Button size="sm" className="mt-2">Apply Now</Button>
          </Card>
        </Card>
      </section>

      {/* Loader */}
      <section>
        <h2 className="font-semibold mb-2">Loader</h2>
        <Loader />
      </section>

      {/* Empty State */}
      <section>
        <h2 className="font-semibold mb-2">Empty State</h2>
        <EmptyState
          title="No Jobs Found"
          description="You can create a new job to get started."
          action={<Button>Create Job</Button>}
        />
      </section>
    </div>
  );
}
