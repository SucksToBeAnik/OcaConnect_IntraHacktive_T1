import HrDashboard from "@/components/dashboard/HrDashboard";


const clubMembers = [
  {
    id: 1,
    email: "test@test.com",
    name: "Test User",
    role: "member",
  },
  {
    id: 2,
    email: "test2@test.com",
    name: "Test User 2",
    role: "admin",
  },
  {
    id: 3,
    email: "test3@test.com",
    name: "Test User 3",
    role: "member",
  },
];
export default function Page() {
  let pageContent;
  const role = "hr";
  if (role === "hr") {
    pageContent = <HrDashboard clubMembers={clubMembers} />;
  }

  return <div>{pageContent}</div>;
}
