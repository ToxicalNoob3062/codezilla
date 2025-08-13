import type { Component } from "solid-js";
import Header from "./components/header";
import Features from "./components/features";
import Registration from "./components/registration";
import Note from "./components/note";

const App: Component = () => {
  return (
    <div class="max-w-screen-2xl mx-auto p-2 lg:p-4 font-lilita bg-[#faf7eb] flex flex-col gap-10 relative">
      <Header />
      <Features />
      <Registration />
      <Note/>
    </div>
  );
};

export default App;
