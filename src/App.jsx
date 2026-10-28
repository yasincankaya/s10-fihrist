import SideBar from "./components/SideBar.jsx";
import Contact from "./components/Contact.jsx";
import Home from "./components/Home.jsx";
import Form from "./components/Form.jsx";
import { Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 1. QueryClient nesnesini oluştur
const queryClient = new QueryClient();

export default function App() {
  return (
    // 2. Uygulamayı Provider ile sarmala
    <QueryClientProvider client={queryClient}>
      <div className="allContent">
        <SideBar />
        <div id="detail" className="flex-1 px-16 py-8">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/contacts/new">
              <Form />
            </Route>
            <Route path="/contacts/:contactId/edit">
              <Form />
            </Route>
            <Route path="/contacts/:contactId">
              <Contact />
            </Route>
          </Switch>
        </div>
      </div>
      {/* DevTools'u ekle, başlangıçta kapalı gelsin */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}