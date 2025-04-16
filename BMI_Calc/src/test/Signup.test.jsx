import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Signup from "../Components/Signup";




describe("Testing Signup component",()=>{
    beforeEach(() => {
        global.fetch = vi.fn();
      });
    
      afterEach(() => {
        vi.resetAllMocks();
      });


      test("renders all the input fields and buttons",()=>{
        render(<Signup/>);
        const inputName = screen.getByPlaceholderText("Full Name");
        const inputEmail = screen.getByPlaceholderText("Email");
        const inputPassword = screen.getByPlaceholderText("Password");
        const btnSign=screen.getByRole("button",{name:/Sign Up/i});

        expect(inputName).toBeInTheDocument();
        expect(inputEmail).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();
        expect(btnSign).toBeInTheDocument();

      })

      test("Allows user to fill the form",()=>{

        render(<Signup/>)
        fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'Gourab' } });

        fireEvent.change(screen.getByPlaceholderText(/Email/i),{target:{value: 'gourab@gmail.com'}});

        fireEvent.change(screen.getByPlaceholderText(/Password/i),{target:{value: 'asd123'}});

        expect(screen.getByPlaceholderText(/Full Name/i)).toHaveValue('Gourab');

        expect(screen.getByPlaceholderText(/Email/i)).toHaveValue('gourab@gmail.com');

        expect(screen.getByPlaceholderText(/Password/i)).toHaveValue('asd123');

      })


      
      test("display success message after successful signup",async ()=>{
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: 'Signup successful!' })
          });

        render(<Signup/>);

        fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'Gourab' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'gourab@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'asd123' } });

        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

  
        await waitFor(() =>
        expect(screen.getByText(/Signup successful! Please login./i)).toBeInTheDocument()
    );

      })



      test("display signup failed message",async()=>{
        fetch.mockResolvedValueOnce({
            ok:false,
            json:async () => ({ message: 'Signup failed.' })
        })

        render(<Signup/>);

        fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'Gourab' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'gourab@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'asd123' } });

        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

  
        await waitFor(() =>
        expect(screen.getByText(/Signup failed./i)).toBeInTheDocument()
    );
  })

  test("Sevrver connectiong error",async()=>{
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Signup/>);

      fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'Gourab' } });
      fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'gourab@gmail.com' } });
      fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'asd123' } });

      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

      await waitFor(() =>
        expect(screen.getByText(/Error connecting to server/i)).toBeInTheDocument()
      );


  })

      
})