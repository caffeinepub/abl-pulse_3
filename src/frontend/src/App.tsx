import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import Section1 from './pages/Section1';
import Section2 from './pages/Section2';
import Section3 from './pages/Section3';
import Section4 from './pages/Section4';
import RecommendedServicesPage from './pages/RecommendedServicesPage';
import WellnessProfilePage from './pages/WellnessProfilePage';
import ResultsPage from './pages/ResultsPage';
import TestModePage from './pages/TestModePage';
import LogicCorrectionDocsPage from './pages/LogicCorrectionDocsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { LoadingScreen } from './components/LoadingScreen';
import { AssessmentProvider } from './contexts/AssessmentContext';

function RootLayout() {
  return <Outlet />;
}

const rootRoute = createRootRoute({
  component: RootLayout,
  pendingComponent: LoadingScreen,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const assessmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assessment',
  component: AssessmentPage,
});

const section1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assessment/section1',
  component: Section1,
});

const section2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assessment/section2',
  component: Section2,
});

const section3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assessment/section3',
  component: Section3,
});

const section4Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assessment/section4',
  component: Section4,
});

const recommendedServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recommended-services',
  component: RecommendedServicesPage,
});

const wellnessProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wellness-profile',
  component: WellnessProfilePage,
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/results',
  component: ResultsPage,
});

const testModeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/test-mode',
  component: TestModePage,
});

const logicDocsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs/logic-corrections',
  component: LogicCorrectionDocsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboardPage,
});

const recommendationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recommendations',
  component: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Recommendations</h1>
        <p className="text-gray-600">This page will be built next!</p>
      </div>
    </div>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  assessmentRoute,
  section1Route,
  section2Route,
  section3Route,
  section4Route,
  recommendedServicesRoute,
  wellnessProfileRoute,
  resultsRoute,
  testModeRoute,
  logicDocsRoute,
  adminRoute,
  recommendationsRoute,
]);

const router = createRouter({ 
  routeTree,
  defaultPendingComponent: LoadingScreen,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <AssessmentProvider>
      <RouterProvider router={router} />
    </AssessmentProvider>
  );
}

export default App;
