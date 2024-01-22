import { CartButton, UserNav } from ".";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="sticky top-0 z-10 shadow">
      <div className="container ms-auto p-4 flex items-center justify-between">
        <Logo />

        <div className="flex items-center justify-center space-x-4">
          <CartButton />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
