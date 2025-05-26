import { createBrowserRouter, RouterProvider, Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Card, Typography, Button } from '../components/atoms';
import { PageLayout } from '../components/templates/PageLayout';

// Importação lazy para otimização de carregamento
const Dashboard = lazy(() => import('../pages/Dashboard'));
const ProdutoresList = lazy(() => import('../pages/ProdutoresList'));
const ProdutorForm = lazy(() => import('../pages/ProdutorForm'));
const ProdutorDetails = lazy(() => import('../pages/ProdutorDetails'));
const PropriedadeForm = lazy(() => import('../pages/PropriedadeForm'));
const PropriedadesList = lazy(() => import('../pages/PropriedadesList'));
const PropriedadeDetails = lazy(() => import('../pages/PropriedadeDetails'));
const SafrasList = lazy(() => import('../pages/SafrasList'));
const SafraForm = lazy(() => import('../pages/SafraForm'));
const SafraDetails = lazy(() => import('../pages/SafraDetails'));
const SelecionarProdutor = lazy(() => import('../pages/SelecionarProdutor'));
const SelecionarPropriedade = lazy(() => import('../pages/SelecionarPropriedade'));

// Componente de loading
const Loading = () => (
  <PageLayout>
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: '60vh'
    }}>
      <div>Carregando...</div>
    </div>
  </PageLayout>
);

// Componente de erro personalizado para rotas
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  padding: 2rem;
`;

const ErrorCard = styled(Card)`
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const ErrorTitle = styled(Typography)`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.danger};
`;

const ErrorMessage = styled(Typography)`
  margin-bottom: 2rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

// Componente para renderizar erros de rota
function ErrorElement() {
  const error = useRouteError();
  let errorMessage = "Ocorreu um erro desconhecido";
  let status = 500;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <PageLayout>
      <ErrorContainer>
        <ErrorCard>
          <ErrorTitle variant="h4">Erro {status}</ErrorTitle>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <ActionsContainer>
            <Button 
              variant="primary" 
              onClick={() => window.location.reload()}
            >
              Recarregar
            </Button>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button variant="outlined">
                Voltar para o Dashboard
              </Button>
            </Link>
          </ActionsContainer>
        </ErrorCard>
      </ErrorContainer>
    </PageLayout>
  );
}

// Definição das rotas
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/produtores',
    element: (
      <Suspense fallback={<Loading />}>
        <ProdutoresList />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/produtores/novo',
    element: (
      <Suspense fallback={<Loading />}>
        <ProdutorForm />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/produtores/editar/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <ProdutorForm />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/propriedades',
    element: (
      <Suspense fallback={<Loading />}>
        <PropriedadesList />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/propriedades/selecionar-produtor',
    element: (
      <Suspense fallback={<Loading />}>
        <SelecionarProdutor />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/propriedades/novo',
    element: (
      <Suspense fallback={<Loading />}>
        <PropriedadeForm />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/propriedades/editar/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <PropriedadeForm />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/produtores/:produtorId/propriedades',
    element: (
      <Suspense fallback={<Loading />}>
        <PropriedadesList />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/produtores/:produtorId/propriedades/novo',
    element: (
      <Suspense fallback={<Loading />}>
        <PropriedadeForm />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/produtores/:produtorId/propriedades/editar/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <PropriedadeForm />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/propriedades/:propriedadeId/safras', 
    element: (
      <Suspense fallback={<Loading />}>
        <SafrasList />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/propriedades/:propriedadeId/safras/novo',
    element: (
      <Suspense fallback={<Loading />}>
        <SafraForm />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/propriedades/:propriedadeId/safras/editar/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <SafraForm />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/safras',
    element: (
      <Suspense fallback={<Loading />}>
        <SafrasList />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/safras/selecionar-propriedade',
    element: (
      <Suspense fallback={<Loading />}>
        <SelecionarPropriedade />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/safras/novo',
    element: (
      <Suspense fallback={<Loading />}>
        <SafraForm />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/safras/editar/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <SafraForm />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/propriedades/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <PropriedadeDetails />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/propriedades/:propriedadeId/safras/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <SafraDetails />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/safras/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <SafraDetails />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/produtores/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <ProdutorDetails />
      </Suspense>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '*',
    element: (
      <PageLayout>
        <ErrorContainer>
          <ErrorCard>
            <ErrorTitle variant="h4">Página não encontrada</ErrorTitle>
            <ErrorMessage>A página que você está procurando não existe ou foi movida.</ErrorMessage>
            <Link to="/">
              <Button variant="primary">Voltar para o Dashboard</Button>
            </Link>
          </ErrorCard>
        </ErrorContainer>
      </PageLayout>
    ),
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
} 