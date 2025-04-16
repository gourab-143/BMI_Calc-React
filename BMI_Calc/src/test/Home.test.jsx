import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import Home from "../Components/Home";

describe('testing the home component', () => {
    beforeEach(()=>{
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    test("rendering all the input fields and buttons",()=>{

        render(<Home/>);
        expect(screen.getByPlaceholderText("Enter weight in kg")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter height in meters")).toBeInTheDocument();
        expect(screen.getByRole("button",{name:"Calculate"})).toBeInTheDocument();
        expect(screen.getByRole("button",{name:"Reset"})).toBeInTheDocument();
    })


    test("allows users to fill the form",()=>{
        render(<Home/>);

        fireEvent.change(screen.getByPlaceholderText("Enter weight in kg"), { target: { value: 75 } });

        fireEvent.change(screen.getByPlaceholderText("Enter height in meters"),{target:{ value: 1.79 }});


        expect(screen.getByPlaceholderText("Enter weight in kg")).toHaveValue(75);
        
        expect(screen.getByPlaceholderText("Enter height in meters")).toHaveValue(1.79);
    })


    test("calculating the correct BMI and showing correct message",async ()=>{
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: 'Record saved' })
          });

          render(<Home/>);

        fireEvent.change(screen.getByPlaceholderText("Enter weight in kg"),{target:{value:75}});
        fireEvent.change(screen.getByPlaceholderText("Enter height in meters"),{target:{value:1.75}});

        fireEvent.click(screen.getByRole("button", { name: "Calculate" }));

        await waitFor(() => {
        expect(screen.getByText(/Your BMI:/i)).toBeInTheDocument();
        expect(screen.getByText(/You have normal weight/i)).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Reset" }));

        })

    });

    test("resets form fields", () => {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ message: "Record saved" }),
        });
      
        render(<Home />);
        const weightInput = screen.getByPlaceholderText("Enter weight in kg");
        const heightInput = screen.getByPlaceholderText("Enter height in meters");
      
        fireEvent.change(weightInput, { target: { value: 70 } });
        fireEvent.change(heightInput, { target: { value: 1.7 } });
      
        fireEvent.click(screen.getByRole("button", { name: "Reset" }));
      
        expect(weightInput).toHaveValue(null);
        expect(heightInput).toHaveValue(null);
        expect(screen.queryByText(/Your BMI:/i)).not.toBeInTheDocument();

      });

})
