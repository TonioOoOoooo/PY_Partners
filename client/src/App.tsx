import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import VirgilePuyau from "@/pages/VirgilePuyau";
import SerafinePoyer from "@/pages/SerafinePoyer";
import Blog from "@/pages/Blog";
import BlogArticle from "@/pages/BlogArticle";
import SmoothScroll from "@/components/common/SmoothScroll";
import { useEffect } from "react";
import { useLanguageStore } from "@/lib/i18n";
import { HelmetProvider } from "react-helmet-async";

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
      <Route path="/virgile-puyau" component={VirgilePuyau}/>
      <Route path="/fr/virgile-puyau" component={VirgilePuyau}/>
      <Route path="/en/virgile-puyau" component={VirgilePuyau}/>
      <Route path="/serafine-poyer" component={SerafinePoyer}/>
      <Route path="/fr/serafine-poyer" component={SerafinePoyer}/>
      <Route path="/en/serafine-poyer" component={SerafinePoyer}/>
      <Route path="/blog" component={Blog}/>
      <Route path="/fr/blog" component={Blog}/>
      <Route path="/en/blog" component={Blog}/>
      <Route path="/blog/:slug" component={BlogArticle}/>
      <Route path="/fr/blog/:slug" component={BlogArticle}/>
      <Route path="/en/blog/:slug" component={BlogArticle}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <SmoothScroll>
        <Router />
        <Toaster />
      </SmoothScroll>
    </HelmetProvider>
  );
}

export default App;