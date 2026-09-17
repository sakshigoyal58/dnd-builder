import { lazy, Suspense } from "react";
import { DndContext } from "@dnd-kit/core";

import Canvas from "./Components/Canvas";
import BuilderToolbar from "./Components/BuilderToolbar";
import Palette from "./Components/Palette";
import ErrorBoundary from "./Items/ErrorBoundary";
import LoadingState from "./Items/LoadingState";
import { useBuilderController } from "./hooks/useBuilderController";

const PropertiesPanel = lazy(
  () => import("./Components/PropertiesPanel")
);

function App() {
  const {
    status,
    sensors,
    handleDragEnd,
    handleSave,
    handleLoad,
  } = useBuilderController();

  return (
    <ErrorBoundary>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex min-h-svh flex-col bg-slate-100 text-slate-900">
          <BuilderToolbar
            status={status}
            onSave={handleSave}
            onLoad={handleLoad}
          />

          <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)_18rem]">

            <aside className="border-b border-slate-200 bg-white lg:border-b-0 lg:border-r">
              <Palette />
            </aside>

            <main className="min-h-[55vh] min-w-0 bg-slate-100 lg:min-h-0">
              <Canvas />
            </main>

            <aside className="border-t border-slate-200 bg-white lg:border-l lg:border-t-0">
              <Suspense fallback={<LoadingState label="Loading properties" />}>
                <PropertiesPanel />
              </Suspense>
            </aside>

          </div>
        </div>
      </DndContext>
    </ErrorBoundary>
  );
}

export default App;