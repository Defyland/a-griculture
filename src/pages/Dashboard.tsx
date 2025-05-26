import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchDashboardData } from '../store/slices/dashboardSlice';
import { PageLayout } from '../components/templates/PageLayout';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, LineChart, Line, LabelList
} from 'recharts';
import { Typography, Card } from '../components';
import { useSpring } from 'react-spring';
import {
  DashboardWrapper,
  DashboardHeader,
  DashboardContainer,
  AnimatedStatValue,
  ChartsContainer,
  ChartTitle,
  ChartContainer,
  LoadingContainer,
  LoadingDot,
  ErrorContainer,
  ErrorMessage,
  COLORS,
  StatCard,
  StatCardIcon,
  StatCardContent,
  StatCardValue,
  StatCardLabel,
  KPIChangePositive,
  MiniChartContainer
} from './styles/Dashboard.styles';
import type {
  AnimatedCounterProps,
  CustomTooltipProps
} from './types/Dashboard.types';

// Função para formatar números grandes
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
};

// Componente de Counter com animação
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState("0");
  useSpring({
    from: { number: 0 },
    number: value,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
    onChange: (result) => {
      const num = result.value.number;
      setDisplayValue(Math.floor(num).toLocaleString('pt-BR'));
    }
  });

  return (
    <AnimatedStatValue>
      {prefix}{displayValue}{suffix}
    </AnimatedStatValue>
  );
};

// Componente de tooltip personalizado no estilo Apple
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        padding: '10px 14px',
        border: 'none',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        borderRadius: '8px',
        fontSize: '12px'
      }}>
        <p style={{ 
          margin: '0 0 5px', 
          fontWeight: 600, 
          color: '#000'
        }}>
          {payload[0].name}
        </p>
        <p style={{ 
          margin: 0, 
          color: payload[0].color || '#007AFF',
          fontWeight: 500
        }}>
          {`${payload[0].value.toLocaleString('pt-BR')} ${payload[0].dataKey === 'value' ? 'hectares' : 'unidades'}`}
        </p>
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(state => state.dashboard);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(fetchDashboardData());

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <PageLayout>
        <LoadingContainer>
          <LoadingDot />
          <LoadingDot />
          <LoadingDot />
        </LoadingContainer>
      </PageLayout>
    );
  }

  if (status === 'failed') {
    return (
      <PageLayout>
        <ErrorContainer>
          <ErrorMessage>
            Erro ao carregar os dados: {error}
          </ErrorMessage>
        </ErrorContainer>
      </PageLayout>
    );
  }

  if (!data) {
    return (
      <PageLayout>
        <LoadingContainer>
          <ErrorMessage>Nenhum dado disponível</ErrorMessage>
        </LoadingContainer>
      </PageLayout>
    );
  }

  // Preparar dados do gráfico de uso do solo
  const usoSoloData = data.distribuicaoUsoSolo.map(item => ({
    name: item.tipo,
    value: item.area
  }));
  
  // Preparar dados do gráfico de culturas
  const culturasData = data.distribuicaoPorCultura
    .map(item => ({
      name: item.cultura,
      quantidade: item.quantidade
    }))
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, windowWidth < 768 ? 5 : 8);
  
  // Preparar dados do gráfico de estados
  const estadosData = data.distribuicaoPorEstado
    .map(item => ({
      name: item.estado,
      quantidade: item.quantidade
    }))
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, windowWidth < 768 ? 5 : 8);
    
  // Dados de tendência (simulados)
  const trendData = [
    { name: 'Jan', valor: 1000 },
    { name: 'Fev', valor: 1200 },
    { name: 'Mar', valor: 1100 },
    { name: 'Abr', valor: 1300 },
    { name: 'Mai', valor: 1500 },
    { name: 'Jun', valor: 1400 },
    { name: 'Jul', valor: 1800 },
  ];

  // Dados de fazendas por mês (para mini gráfico)
  const fazendasMensalData = [
    { name: 'Abr', valor: 1 },
    { name: 'Mai', valor: 2 },
    { name: 'Jun', valor: 2 },
    { name: 'Jul', valor: 3 },
  ];

  // Dados de área por mês (para mini gráfico)
  const areaMensalData = [
    { name: 'Abr', valor: 2100 },
    { name: 'Mai', valor: 3200 },
    { name: 'Jun', valor: 4000 },
    { name: 'Jul', valor: 4700 },
  ];

  // Dados de estados com fazendas (para mini gráfico)
  const estadosMensalData = [
    { name: 'Abr', valor: 1 },
    { name: 'Mai', valor: 1 },
    { name: 'Jun', valor: 2 },
    { name: 'Jul', valor: 3 },
  ];

  // Dados de culturas por mês (para mini gráfico)
  const culturasMensalData = [
    { name: 'Abr', valor: 3 },
    { name: 'Mai', valor: 4 },
    { name: 'Jun', valor: 5 },
    { name: 'Jul', valor: 7 },
  ];

  // Dados de progresso de plantio com formato para RadialBarChart
  const progressoPlantioData = [
    { name: 'Cana-de-açúcar', valor: 92, fill: '#5AC8FA' },
    { name: 'Soja', valor: 85, fill: '#34C759' },
    { name: 'Milho', valor: 65, fill: '#007AFF' },
    { name: 'Algodão', valor: 40, fill: '#FF9500' },
  ];

  return (
    <PageLayout>
      <DashboardWrapper>
        <DashboardHeader>
          <Typography variant="h1">Dashboard</Typography>
          <Typography variant="body1">
            <span style={{ color: '#86868B', display: 'block', marginTop: '0.5rem' }}>
              Visão geral dos produtores rurais e suas propriedades
            </span>
          </Typography>
        </DashboardHeader>

        <DashboardContainer>
          <StatCard>
            <StatCardIcon color="primary">🏡</StatCardIcon>
            <StatCardContent>
              <StatCardValue>
                <AnimatedCounter value={data.totalFazendas} />
              </StatCardValue>
              <StatCardLabel>Fazendas Cadastradas</StatCardLabel>
              <KPIChangePositive>+12% este mês</KPIChangePositive>
              <MiniChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fazendasMensalData}>
                    <Line 
                      type="monotone" 
                      dataKey="valor" 
                      stroke="#34C759" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </MiniChartContainer>
            </StatCardContent>
          </StatCard>
          
          <StatCard>
            <StatCardIcon color="secondary">📏</StatCardIcon>
            <StatCardContent>
              <StatCardValue>
                <AnimatedCounter value={data.totalAreaHectares} suffix=" ha" />
              </StatCardValue>
              <StatCardLabel>Hectares Totais</StatCardLabel>
              <KPIChangePositive>+5% este mês</KPIChangePositive>
              <MiniChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaMensalData}>
                    <defs>
                      <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#007AFF" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#007AFF" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="valor" 
                      stroke="#007AFF" 
                      fill="url(#gradientArea)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </MiniChartContainer>
            </StatCardContent>
          </StatCard>
          
          <StatCard>
            <StatCardIcon color="tertiary">🗺️</StatCardIcon>
            <StatCardContent>
              <StatCardValue>
                <AnimatedCounter value={data.distribuicaoPorEstado.length} />
              </StatCardValue>
              <StatCardLabel>Estados com Fazendas</StatCardLabel>
              <KPIChangePositive>+2 novos</KPIChangePositive>
              <MiniChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={estadosMensalData}>
                    <Bar 
                      dataKey="valor" 
                      fill="#FF9500"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </MiniChartContainer>
            </StatCardContent>
          </StatCard>
          
          <StatCard>
            <StatCardIcon color="info">🌱</StatCardIcon>
            <StatCardContent>
              <StatCardValue>
                <AnimatedCounter value={data.distribuicaoPorCultura.length} />
              </StatCardValue>
              <StatCardLabel>Culturas Diferentes</StatCardLabel>
              <KPIChangePositive>+3 novas</KPIChangePositive>
              <MiniChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={culturasMensalData}>
                    <Line 
                      type="monotone" 
                      dataKey="valor" 
                      stroke="#5AC8FA" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </MiniChartContainer>
            </StatCardContent>
          </StatCard>
        </DashboardContainer>
        
        {/* Gráficos menores - linha superior */}
        <ChartsContainer>
          <div style={{ flex: 2 }}>
            <Card elevation="medium">
              <ChartTitle>Distribuição por Estado</ChartTitle>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={estadosData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    barSize={windowWidth < 768 ? 20 : 30}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F2F2F7" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#86868B" 
                      fontSize={12}
                      tickMargin={8}
                    />
                    <YAxis 
                      stroke="#86868B" 
                      fontSize={12}
                      tickFormatter={formatNumber}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="quantidade" 
                      fill="#34C759" 
                      radius={[4, 4, 0, 0]}
                    >
                      {estadosData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Card>
          </div>

          <div style={{ flex: 1 }}>
            <Card elevation="medium">
              <ChartTitle>Uso do Solo</ChartTitle>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Pie
                      data={usoSoloData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={windowWidth < 768 ? 70 : 90}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth={2}
                    >
                      {usoSoloData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Card>
          </div>
        </ChartsContainer>
        
        {/* Gráficos menores - linha inferior */}
        <ChartsContainer>
          <div style={{ flex: 1 }}>
            <Card elevation="medium">
              <ChartTitle>Tendência de Crescimento</ChartTitle>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={trendData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34C759" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#34C759" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      stroke="#86868B" 
                      fontSize={12}
                      tickMargin={8}
                    />
                    <YAxis 
                      stroke="#86868B" 
                      fontSize={12}
                      tickFormatter={formatNumber}
                    />
                    <CartesianGrid strokeDasharray="3 3" stroke="#F2F2F7" />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="valor" 
                      stroke="#34C759" 
                      fillOpacity={1} 
                      fill="url(#colorGradient)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Card>
          </div>
          
          <div style={{ flex: 1 }}>
            <Card elevation="medium">
              <ChartTitle>Principais Culturas</ChartTitle>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={culturasData.slice(0, 5)}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F2F2F7" horizontal={false} />
                    <XAxis 
                      type="number" 
                      stroke="#86868B" 
                      fontSize={12}
                      tickMargin={8}
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="#86868B" 
                      fontSize={12}
                      tickMargin={8}
                      width={100}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="quantidade" 
                      fill="#34C759" 
                      radius={[0, 4, 4, 0]}
                    >
                      {culturasData.slice(0, 5).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Card>
          </div>
        </ChartsContainer>
        
        {/* Métricas de progresso */}
        <ChartsContainer>
          <Card elevation="medium">
            <ChartTitle>Progresso de Plantio</ChartTitle>
            <div style={{ 
              display: 'flex', 
              flexDirection: windowWidth < 1024 ? 'column' : 'row',
              gap: '30px'
            }}>
              {/* Gráfico Principal */}
              <div style={{ 
                flex: 1.2, 
                minWidth: windowWidth < 1024 ? '100%' : '400px', 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <ChartContainer style={{ height: 350, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={progressoPlantioData}
                      margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
                      barSize={40}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis 
                        type="number" 
                        domain={[0, 100]} 
                        tickFormatter={(value) => `${value}%`}
                        fontSize={13}
                      />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={120}
                        tick={{ fontSize: 14, fontWeight: 500 }}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Progresso']}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          borderRadius: '8px',
                          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                          border: 'none',
                          padding: '12px 16px',
                          fontSize: '14px'
                        }}
                      />
                      <Legend 
                        verticalAlign="top"
                        wrapperStyle={{ paddingBottom: '20px' }}
                      />
                      <Bar 
                        dataKey="valor" 
                        name="Progresso de Plantio"
                        radius={[0, 6, 6, 0]}
                      >
                        {progressoPlantioData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                        <LabelList 
                          dataKey="valor" 
                          position="right" 
                          formatter={(value: number) => `${value}%`}
                          style={{ 
                            fontWeight: 'bold', 
                            fontSize: '14px',
                            fill: '#333'
                          }} 
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              {/* Detalhes e Estatísticas */}
              <div style={{ flex: 1, padding: '20px 10px' }}>
                <div style={{ 
                  backgroundColor: '#fcfcfc', 
                  borderRadius: '12px', 
                  padding: '20px', 
                  boxShadow: 'inset 0 0 8px rgba(0,0,0,0.03)',
                  marginBottom: '20px'
                }}>
                  <Typography variant="h5" style={{ marginBottom: '15px', fontWeight: 'normal' }}>
                    Resumo de Progresso
                  </Typography>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                    <div style={{ flex: '1 0 45%', minWidth: '150px' }}>
                      <Typography variant="body2" style={{ color: '#86868B', marginBottom: '4px' }}>
                        Média de Progresso
                      </Typography>
                      <Typography variant="h3" style={{ fontWeight: 'bold', color: '#007AFF' }}>
                        70.5%
                      </Typography>
                    </div>
                    
                    <div style={{ flex: '1 0 45%', minWidth: '150px' }}>
                      <Typography variant="body2" style={{ color: '#86868B', marginBottom: '4px' }}>
                        Cultura Mais Avançada
                      </Typography>
                      <Typography variant="body1" style={{ fontWeight: 'bold', color: '#5AC8FA' }}>
                        Cana-de-açúcar (92%)
                      </Typography>
                    </div>
                    
                    <div style={{ flex: '1 0 45%', minWidth: '150px' }}>
                      <Typography variant="body2" style={{ color: '#86868B', marginBottom: '4px' }}>
                        Área Total Plantada
                      </Typography>
                      <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                        1.456 hectares
                      </Typography>
                    </div>
                    
                    <div style={{ flex: '1 0 45%', minWidth: '150px' }}>
                      <Typography variant="body2" style={{ color: '#86868B', marginBottom: '4px' }}>
                        Meta para Conclusão
                      </Typography>
                      <Typography variant="body1" style={{ fontWeight: 'bold', color: '#FF9500' }}>
                        20 Dezembro 2023
                      </Typography>
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  backgroundColor: '#f8f8f8', 
                  borderRadius: '12px', 
                  padding: '20px'
                }}>
                  <Typography variant="h5" style={{ marginBottom: '15px', fontWeight: 'normal' }}>
                    Plantio por Safra
                  </Typography>
                  
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ 
                      backgroundColor: '#fff', 
                      padding: '15px 20px 5px',
                      borderRadius: '10px', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
                      flex: 1, 
                      minWidth: '160px'
                    }}>
                      <Typography variant="body1" style={{ color: '#007AFF', fontWeight: 'bold', marginBottom: '8px' }}>
                        Safra 2023
                      </Typography>
                      <ResponsiveContainer width="100%" height={80}>
                        <BarChart
                          data={[
                            { name: 'Progresso', percentual: 78, valor: 5460 }
                          ]}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                          layout="vertical"
                        >
                          <XAxis type="number" domain={[0, 100]} hide />
                          <YAxis type="category" dataKey="name" hide />
                          <Tooltip 
                            formatter={(value, name) => {
                              if (name === 'percentual') return [`${value}%`, 'Concluído'];
                              return [value, name];
                            }}
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #f0f0f0',
                              borderRadius: '4px',
                              padding: '8px'
                            }}
                          />
                          <Bar 
                            dataKey="percentual" 
                            fill="#007AFF" 
                            background={{ fill: '#f0f0f0' }}
                            barSize={14}
                            radius={[7, 7, 7, 7]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                      <Typography variant="h3" style={{ textAlign: 'center', fontWeight: 'bold', color: '#007AFF', margin: '5px 0' }}>
                        78%
                      </Typography>
                      <Typography variant="body2" style={{ textAlign: 'center', color: '#666', fontSize: '12px' }}>
                        5.460 hectares plantados
                      </Typography>
                    </div>
                    
                    <div style={{ 
                      backgroundColor: '#fff', 
                      padding: '15px 20px 5px',
                      borderRadius: '10px', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
                      flex: 1, 
                      minWidth: '160px'
                    }}>
                      <Typography variant="body1" style={{ color: '#34C759', fontWeight: 'bold', marginBottom: '8px' }}>
                        Safra 2024
                      </Typography>
                      <ResponsiveContainer width="100%" height={80}>
                        <BarChart
                          data={[
                            { name: 'Progresso', percentual: 47, valor: 3290 }
                          ]}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                          layout="vertical"
                        >
                          <XAxis type="number" domain={[0, 100]} hide />
                          <YAxis type="category" dataKey="name" hide />
                          <Tooltip 
                            formatter={(value, name) => {
                              if (name === 'percentual') return [`${value}%`, 'Concluído'];
                              return [value, name];
                            }}
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #f0f0f0',
                              borderRadius: '4px',
                              padding: '8px'
                            }}
                          />
                          <Bar 
                            dataKey="percentual" 
                            fill="#34C759" 
                            background={{ fill: '#f0f0f0' }}
                            barSize={14}
                            radius={[7, 7, 7, 7]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                      <Typography variant="h3" style={{ textAlign: 'center', fontWeight: 'bold', color: '#34C759', margin: '5px 0' }}>
                        47%
                      </Typography>
                      <Typography variant="body2" style={{ textAlign: 'center', color: '#666', fontSize: '12px' }}>
                        3.290 hectares plantados
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </ChartsContainer>
      </DashboardWrapper>
    </PageLayout>
  );
};

export default Dashboard;