
import { Route, Routes } from "react-router-dom";
import routes from "./assets/config/routes";
function App() {

  return (
    <div className="bg-zinc-900 text-white">
      <Routes>
        {
          routes?.map(({ path, element }, index) => <Route key={index} path={path} element={element} />)
        }
      </Routes>
    </div>
  )
}

export default App
