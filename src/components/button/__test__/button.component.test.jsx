import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/button/button.component";

describe("<Button />", () => {
  it("should render the content passed as children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("should call onClick when pressed", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Save</Button>);
    await user.click(screen.getByRole("button", { name: /save/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply the "primary" variant classes', () => {
    render(<Button variant="primary">Primary</Button>);
    const btn = screen.getByRole("button", { name: /primary/i });
    expect(btn).toHaveClass("bg-[var(--primary-button-background)]");
    expect(btn).toHaveClass("text-[var(--white)]");
  });

  it('should apply the "outline" variant classes', () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole("button", { name: /outline/i });
    expect(btn).toHaveClass("border-2");
    expect(btn).toHaveClass("border-[var(--primary-button-background)]");
  });

  it("should take full width when fullWidth is true", () => {
    render(<Button fullWidth>Wide</Button>);
    const btn = screen.getByRole("button", { name: /wide/i });
    expect(btn).toHaveClass("w-full");
  });
});
