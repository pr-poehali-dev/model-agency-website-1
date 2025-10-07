import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface Model {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  height: number;
  measurements: string;
  experienceYears: number;
  pricePerHour: number;
  description: string;
  isAvailable: boolean;
}

interface ModelsTableProps {
  models: Model[];
  loading: boolean;
  onEdit: (model: Model) => void;
  onDelete: (modelId: number) => void;
}

const ModelsTable = ({ models, loading, onEdit, onDelete }: ModelsTableProps) => {
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'luxury': return 'Люкс';
      case 'premium': return 'Премиум';
      case 'basic': return 'Базовые';
      default: return category;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Фото</TableHead>
            <TableHead>Имя</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead>Рост</TableHead>
            <TableHead>Опыт</TableHead>
            <TableHead>Цена/час</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models.map((model) => (
            <TableRow key={model.id}>
              <TableCell>
                <img src={model.imageUrl} alt={model.name} className="w-16 h-16 object-cover rounded" />
              </TableCell>
              <TableCell className="font-medium">{model.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{getCategoryLabel(model.category)}</Badge>
              </TableCell>
              <TableCell>{model.height} см</TableCell>
              <TableCell>{model.experienceYears} лет</TableCell>
              <TableCell>{model.pricePerHour.toLocaleString()} ₽</TableCell>
              <TableCell>
                {model.isAvailable ? (
                  <Badge className="bg-green-500">Активна</Badge>
                ) : (
                  <Badge variant="secondary">Скрыта</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" onClick={() => onEdit(model)}>
                    <Icon name="Pencil" size={16} />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(model.id)}>
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ModelsTable;
