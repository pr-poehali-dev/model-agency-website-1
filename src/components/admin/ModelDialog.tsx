import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import type { Model } from './ModelsTable';

export interface ModelForm {
  id?: number;
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

interface ModelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingModel: Model | null;
  modelForm: ModelForm;
  onModelFormChange: (form: ModelForm) => void;
  onSave: () => void;
  uploadApi: string;
}

interface UploadState {
  uploading: boolean;
  preview: string;
}

const ModelDialog = ({ 
  open, 
  onOpenChange, 
  editingModel, 
  modelForm, 
  onModelFormChange, 
  onSave,
  uploadApi 
}: ModelDialogProps) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    uploading: false,
    preview: editingModel?.imageUrl || ''
  });
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Ошибка', description: 'Пожалуйста, выберите изображение', variant: 'destructive' });
      return;
    }

    setUploadState({ uploading: true, preview: '' });

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setUploadState({ uploading: true, preview: base64String });

        const response = await fetch(uploadApi, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64String })
        });

        const data = await response.json();

        if (data.success) {
          onModelFormChange({ ...modelForm, imageUrl: data.url });
          toast({ title: 'Успех!', description: 'Фото загружено' });
        } else {
          toast({ title: 'Ошибка', description: data.error, variant: 'destructive' });
        }
        setUploadState({ uploading: false, preview: base64String });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить фото', variant: 'destructive' });
      setUploadState({ uploading: false, preview: '' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl">
            {editingModel ? 'Редактировать модель' : 'Добавить модель'}
          </DialogTitle>
          <DialogDescription>Заполните информацию о модели</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                value={modelForm.name}
                onChange={(e) => onModelFormChange({ ...modelForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Категория *</Label>
              <Select value={modelForm.category} onValueChange={(value) => onModelFormChange({ ...modelForm, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Базовые</SelectItem>
                  <SelectItem value="premium">Премиум</SelectItem>
                  <SelectItem value="luxury">Люкс</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Фото модели *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              {uploadState.preview || modelForm.imageUrl ? (
                <div className="space-y-3">
                  <img 
                    src={uploadState.preview || modelForm.imageUrl} 
                    alt="Preview" 
                    className="mx-auto h-48 w-auto object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    disabled={uploadState.uploading}
                  >
                    <Icon name="Upload" size={16} className="mr-2" />
                    Изменить фото
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Icon name="ImagePlus" size={48} className="mx-auto text-muted-foreground" />
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('file-upload')?.click()}
                      disabled={uploadState.uploading}
                    >
                      <Icon name="Upload" size={16} className="mr-2" />
                      {uploadState.uploading ? 'Загрузка...' : 'Выбрать фото'}
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">или укажите URL</p>
                  </div>
                </div>
              )}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
              />
            </div>
            <Input
              id="imageUrl"
              value={modelForm.imageUrl}
              onChange={(e) => onModelFormChange({ ...modelForm, imageUrl: e.target.value })}
              placeholder="https://example.com/photo.jpg"
              className="mt-2"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Рост (см)</Label>
              <Input
                id="height"
                type="number"
                value={modelForm.height}
                onChange={(e) => onModelFormChange({ ...modelForm, height: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="measurements">Параметры</Label>
              <Input
                id="measurements"
                value={modelForm.measurements}
                onChange={(e) => onModelFormChange({ ...modelForm, measurements: e.target.value })}
                placeholder="90-60-90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Опыт (лет)</Label>
              <Input
                id="experience"
                type="number"
                value={modelForm.experienceYears}
                onChange={(e) => onModelFormChange({ ...modelForm, experienceYears: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Цена за час (₽) *</Label>
            <Input
              id="price"
              type="number"
              value={modelForm.pricePerHour}
              onChange={(e) => onModelFormChange({ ...modelForm, pricePerHour: parseFloat(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={modelForm.description}
              onChange={(e) => onModelFormChange({ ...modelForm, description: e.target.value })}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={onSave} className="bg-black hover:bg-black/90">
            {editingModel ? 'Сохранить' : 'Добавить'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModelDialog;
