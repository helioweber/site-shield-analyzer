
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import { useToast } from '@/hooks/use-toast';

interface PDFExporterProps {
  analysisData: any;
  url: string;
}

const PDFExporter = ({ analysisData, url }: PDFExporterProps) => {
  const { toast } = useToast();

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 20;

      // Função auxiliar para adicionar nova página se necessário
      const checkNewPage = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
      };

      // Função auxiliar para texto centralizado
      const addCenteredText = (text: string, fontSize: number, isBold = false) => {
        doc.setFontSize(fontSize);
        if (isBold) doc.setFont('helvetica', 'bold');
        else doc.setFont('helvetica', 'normal');
        
        const textWidth = doc.getTextWidth(text);
        const x = (pageWidth - textWidth) / 2;
        doc.text(text, x, yPosition);
        yPosition += fontSize * 0.5;
      };

      // Cabeçalho do relatório
      addCenteredText('RELATÓRIO DE ANÁLISE WEB', 20, true);
      addCenteredText(`${url}`, 14);
      yPosition += 10;
      addCenteredText(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 10);
      yPosition += 20;

      // Seção de Performance
      checkNewPage(60);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('ANÁLISE DE PERFORMANCE', 20, yPosition);
      yPosition += 15;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Tempo de Carregamento: ${analysisData.performance.loadTime}s`, 20, yPosition);
      yPosition += 8;
      doc.text(`Tamanho da Página: ${(analysisData.performance.pageSize / 1024 / 1024).toFixed(2)} MB`, 20, yPosition);
      yPosition += 8;
      doc.text(`Número de Requisições: ${analysisData.performance.requests}`, 20, yPosition);
      yPosition += 8;
      doc.text(`Score de Performance: ${analysisData.performance.performanceScore}/100`, 20, yPosition);
      yPosition += 20;

      // Seção de Segurança
      checkNewPage(80);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('ANÁLISE DE SEGURANÇA', 20, yPosition);
      yPosition += 15;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Status Geral: ${analysisData.security.overall.toUpperCase()}`, 20, yPosition);
      yPosition += 8;
      doc.text(`HTTPS: ${analysisData.security.https ? 'Ativo' : 'Inativo'}`, 20, yPosition);
      yPosition += 15;

      // Headers de Segurança
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Headers de Segurança:', 20, yPosition);
      yPosition += 10;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`• HSTS: ${analysisData.security.headers.hsts ? 'Configurado' : 'Não configurado'}`, 25, yPosition);
      yPosition += 6;
      doc.text(`• CSP: ${analysisData.security.headers.csp ? 'Configurado' : 'Não configurado'}`, 25, yPosition);
      yPosition += 6;
      doc.text(`• X-Frame-Options: ${analysisData.security.headers.xframe ? 'Configurado' : 'Não configurado'}`, 25, yPosition);
      yPosition += 6;
      doc.text(`• XSS Protection: ${analysisData.security.headers.xss ? 'Configurado' : 'Não configurado'}`, 25, yPosition);
      yPosition += 20;

      // Problemas Identificados
      if (analysisData.security.issues.length > 0) {
        checkNewPage(40 + (analysisData.security.issues.length * 15));
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Problemas Identificados:', 20, yPosition);
        yPosition += 10;

        analysisData.security.issues.forEach((issue: any, index: number) => {
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.text(`${index + 1}. ${issue.title}`, 25, yPosition);
          yPosition += 6;
          
          doc.setFont('helvetica', 'normal');
          const descLines = doc.splitTextToSize(issue.description, pageWidth - 50);
          doc.text(descLines, 30, yPosition);
          yPosition += descLines.length * 5 + 8;
          
          checkNewPage(20);
        });
      }

      // Seção de Localizações
      yPosition += 10;
      checkNewPage(40);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('PERFORMANCE POR LOCALIZAÇÃO', 20, yPosition);
      yPosition += 15;

      // Estatísticas das localizações
      const locations = analysisData.locations;
      const avgTime = locations.reduce((acc: number, loc: any) => acc + loc.loadTime, 0) / locations.length;
      const fastestLocation = locations.reduce((prev: any, current: any) => 
        prev.loadTime < current.loadTime ? prev : current
      );
      const slowestLocation = locations.reduce((prev: any, current: any) => 
        prev.loadTime > current.loadTime ? prev : current
      );

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Tempo Médio Global: ${avgTime.toFixed(2)}s`, 20, yPosition);
      yPosition += 8;
      doc.text(`Localização Mais Rápida: ${fastestLocation.city}, ${fastestLocation.country} (${fastestLocation.loadTime}s)`, 20, yPosition);
      yPosition += 8;
      doc.text(`Localização Mais Lenta: ${slowestLocation.city}, ${slowestLocation.country} (${slowestLocation.loadTime}s)`, 20, yPosition);
      yPosition += 15;

      // Top 10 localizações
      const sortedLocations = [...locations].sort((a, b) => a.loadTime - b.loadTime).slice(0, 10);
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Top 10 Melhores Performances:', 20, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      sortedLocations.forEach((location: any, index: number) => {
        checkNewPage(15);
        doc.text(`${index + 1}. ${location.city}, ${location.country}: ${location.loadTime}s`, 25, yPosition);
        yPosition += 6;
      });

      // Rodapé
      yPosition += 20;
      checkNewPage(30);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      addCenteredText('Relatório gerado pelo WebSec Analyzer', 10);
      addCenteredText('Para mais informações sobre segurança web, consulte OWASP.org', 8);

      // Salvar o PDF
      const fileName = `websec-analysis-${url.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);

      toast({
        title: "PDF Exportado com Sucesso!",
        description: `Relatório salvo como ${fileName}`,
      });

    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast({
        title: "Erro na Exportação",
        description: "Não foi possível gerar o PDF. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      onClick={generatePDF}
      className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      size="lg"
    >
      <FileDown className="w-5 h-5" />
      <span>Exportar Relatório PDF</span>
    </Button>
  );
};

export default PDFExporter;
