import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import SmoothScroll from "@/components/common/SmoothScroll";
import { useEffect } from "react";
import { useLanguageStore } from "@/lib/i18n";

function Router() {
  const [location] = useLocation();
  const { language, setLanguage } = useLanguageStore();

  // Synchroniser la langue avec l'URL
  useEffect(() => {
    if (location.startsWith("/en")) {
      if (language !== "en") setLanguage("en");
    } else {
      if (language !== "fr") setLanguage("fr");
    }
  }, [location, language, setLanguage]);

  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/fr" component={Home}/>
      <Route path="/en" component={Home}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <SmoothScroll>
      <Router />
      <Toaster />
    </SmoothScroll>
  );
}

export default App;