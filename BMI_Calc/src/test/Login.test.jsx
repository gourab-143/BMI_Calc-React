import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import Login from "../Components/Login";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

describe("Testing Login component",()=>{
    beforeEach(()=>{
        global.fetch=vi.fn();
    });

    afterEach(()=>{
        vi.resetAllMocks();
    })

    const mockLogin = vi.fn();

  const renderWithContext = () =>{
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ login: mockLogin }}>
          <Login />
        </AuthContext.Provider>
      </BrowserRouter>
    );
}

    test("renders all input fields and button",()=>{
        renderWithContext();
        const input1=screen.getByPlaceholderText("Email");
        const input2=screen.getByPlaceholderText("Password");
        const btnLogin=screen.getByRole("button",{name:"Login"});

        expect(input1).toBeInTheDocument();
        expect(input2).toBeInTheDocument();
        expect(btnLogin).toBeInTheDocument();
    })

    test("Allows user to fill up the form",()=>{
        renderWithContext();

        const inputEmail=screen.getByPlaceholderText("Email")
        fireEvent.change(inputEmail,{target:{value:'gourab@gmail.com'}});
        expect(inputEmail).toHaveValue('gourab@gmail.com');

        const inputPass=screen.getByPlaceholderText("Password")
        fireEvent.change(inputPass,{target:{value:'asd123'}});
        expect(inputPass).toHaveValue('asd123');


    })

    test("testing successful login",async()=>{
        fetch.mockResolvedValueOnce({
            ok:true,
            json:async()=>({message:"Login successful! Redirecting..."})
        })

        renderWithContext();

        const inputEmail=screen.getByPlaceholderText("Email")
        fireEvent.change(inputEmail,{target:{value:'gourab@gmail.com'}});
        expect(inputEmail).toHaveValue('gourab@gmail.com');

        const inputPass=screen.getByPlaceholderText("Password")
        fireEvent.change(inputPass,{target:{value:'asd123'}});
        expect(inputPass).toHaveValue('asd123');

        fireEvent.click(screen.getByRole("button",{name:"Login"}))

        await waitFor(()=>{
            expect(screen.getByText("Login successful! Redirecting...")).toBeInTheDocument();
        })


    })



    test("testing failed login",async()=>{
        fetch.mockResolvedValueOnce({
            ok:false,
            json:async()=>({message:"Login failed. Try again."})
        })

        renderWithContext();

        const inputEmail=screen.getByPlaceholderText("Email")
        fireEvent.change(inputEmail,{target:{value:'gourab@gmail.com'}});
        expect(inputEmail).toHaveValue('gourab@gmail.com');

        const inputPass=screen.getByPlaceholderText("Password")
        fireEvent.change(inputPass,{target:{value:'asd123'}});
        expect(inputPass).toHaveValue('asd123');

        fireEvent.click(screen.getByRole("button",{name:"Login"}))

        await waitFor(()=>{
            expect(screen.getByText("Login failed. Try again.")).toBeInTheDocument();
        })


    })

})

