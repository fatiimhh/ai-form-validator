import { render, screen } from "@testing-library/react";
import ResultFields from "../ResultFields";


const mockData = {
  subject: "Meeting",
  date: "2025-08-15",
  time: "10:00 AM",
  location:"at the office",
  priority:"high",
  Category:"Meeting"
};

test("renders result fields correctly", () => {
  render(<ResultFields data={mockData} onChange={() => {}} />);
  
  expect(screen.getByDisplayValue("Meeting")).toBeInTheDocument();
  expect(screen.getByDisplayValue("2025-08-15")).toBeInTheDocument();
  expect(screen.getByDisplayValue("10:00 AM")).toBeInTheDocument();
});
