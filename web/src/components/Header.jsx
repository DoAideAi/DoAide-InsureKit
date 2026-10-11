import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="border-b border-white/7">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 no-underline">
          <span className="text-lg font-semibold tracking-tight">
            <span className="text-signal">DoAide</span>
            <span className="text-white/30 mx-1.5">|</span>
            <span className="text-white">InsureKit</span>
          </span>
        </a>
        <div className="flex items-center gap-4">
          <div className="text-white/30 text-xs hidden sm:block px-2 py-1 rounded-full border border-white/10">
            A DoAide Product
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
