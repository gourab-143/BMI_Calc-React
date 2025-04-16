import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import About from "../Components/About";

describe("Testing About Component",()=>{
    test("Testing the heading",()=>{
        render(<About/>);
        const header=screen.getByText("About BMI");
        expect(header).toBeInTheDocument();
    })



    test("Testing all the section headings (h3)",()=>{
        render(<About/>);
        const secHeader1=screen.getByText("📌 What is BMI?");
        const secHeader2=screen.getByText("📊 How is BMI Calculated?");
        const secHeader3=screen.getByText("📋 BMI Categories");
        const secHeader4=screen.getByText("💡 Why is BMI Important?");
        const secHeader5=screen.getByText("⚠ Limitations of BMI");
        
        expect(secHeader1).toBeInTheDocument();
        expect(secHeader2).toBeInTheDocument();
        expect(secHeader3).toBeInTheDocument();
        expect(secHeader4).toBeInTheDocument();
        expect(secHeader5).toBeInTheDocument();
    })
   
    
      test('renders all BMI categories', () => {
        render(<About />);
        expect(screen.getByText('Underweight')).toBeInTheDocument();
        expect(screen.getByText('Normal Weight')).toBeInTheDocument();
        expect(screen.getByText('Overweight')).toBeInTheDocument();
        expect(screen.getByText('Obese')).toBeInTheDocument();
      });
    
      test('renders limitations list', () => {
        render(<About />);
        expect(screen.getByText(/Does not measure body fat directly/i)).toBeInTheDocument();
        expect(screen.getByText(/Does not consider muscle mass/i)).toBeInTheDocument();
        expect(screen.getByText(/Does not account for age/i)).toBeInTheDocument();
      });

      test("Rendering the formula",()=>{
        render(<About/>);
        expect(screen.getByText("Weight (kg)")).toBeInTheDocument();
        expect(screen.getByText("Height (m)²")).toBeInTheDocument();
        expect(screen.getByText("Weight (lb) × 703")).toBeInTheDocument();
        expect(screen.getByText("Height (in)²")).toBeInTheDocument();
      })


})