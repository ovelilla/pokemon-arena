import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/button/button.component";

describe("<Button />", () => {
  it("muestra el contenido pasado como children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("llama a onClick cuando se pulsa", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Save</Button>);
    await user.click(screen.getByRole("button", { name: /save/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('aplica las clases del variante "primary"', () => {
    render(<Button variant="primary">Primary</Button>);
    const btn = screen.getByRole("button", { name: /primary/i });
    expect(btn).toHaveClass("bg-[var(--primary-button-background)]");
    expect(btn).toHaveClass("text-[var(--white)]");
  });

  it('aplica las clases del variante "outline"', () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole("button", { name: /outline/i });
    expect(btn).toHaveClass("border-2");
    expect(btn).toHaveClass("border-[var(--primary-button-background)]");
  });

  it("toma todo el ancho cuando fullWidth es true", () => {
    render(<Button fullWidth>Wide</Button>);
    const btn = screen.getByRole("button", { name: /wide/i });
    expect(btn).toHaveClass("w-full");
  });
});
