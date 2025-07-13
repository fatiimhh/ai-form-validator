import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SavedResults from "../SavedResults";



jest.mock("../../firebase", () => ({
  db: {},
}));


jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  deleteDoc: jest.fn(),
  updateDoc: jest.fn(),
  onSnapshot: (col, callback) => {
    callback({
      docs: [
        {
          id: "1",
          data: () => ({
            subject: "Test Subject",
            date: "2024-07-15",
            time: "3:00 PM",
            location:"at the office",
            priority:"high",
            Category:"Meeting"
          }),
        },
      ],
    });
    return () => {}; 
  },
}));

describe("SavedResults", () => {
  it("renders saved items", async () => {
    render(<SavedResults />);
    expect(await screen.findByText(/Test Subject/i)).toBeInTheDocument();
  });

  it("calls deleteDoc when delete is clicked", async () => {
    const { deleteDoc } = require("firebase/firestore");
    render(<SavedResults />);
    const deleteBtn = await screen.findByText("Delete");
    fireEvent.click(deleteBtn);
    expect(deleteDoc).toHaveBeenCalled();
  });

  it("allows editing and calls updateDoc", async () => {
    const { updateDoc } = require("firebase/firestore");
    render(<SavedResults />);
    const editBtn = await screen.findByText("Edit");
    fireEvent.click(editBtn);

    const subjectInput = await screen.findByPlaceholderText("Subject");
    fireEvent.change(subjectInput, { target: { value: "Updated Subject" } });

    const saveBtn = await screen.findByText("Save");
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalled();
    });
  });
});
