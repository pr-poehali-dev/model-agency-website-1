import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Model {
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

interface LoginForm {
  username: string;
  password: string;
}

interface ModelForm {
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

interface UploadState {
  uploading: boolean;
  preview: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [loginForm, setLoginForm] = useState<LoginForm>({ username: '', password: '' });
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [modelForm, setModelForm] = useState<ModelForm>({
    name: '',
    category: 'basic',
    imageUrl: '',
    height: 170,
    measurements: '',
    experienceYears: 0,
    pricePerHour: 0,
    description: '',
    isAvailable: true
  });
  const [uploadState, setUploadState] = useState<UploadState>({
    uploading: false,
    preview: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const AUTH_API = 'https://functions.poehali.dev/7b10efe2-1f83-4062-91e1-fd9eaca39211';
  const MODELS_API = 'https://functions.poehali.dev/fda65910-2f69-4b23-be36-4259b965eca3';
  const ADMIN_MODELS_API = 'https://functions.poehali.dev/3caaab7f-6a87-413e-9e31-3019d5ce61e1';
  const UPLOAD_API = 'https://functions.poehali.dev/2fad90a8-00bf-4d6d-95a8-bcabc08185e2';

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAdminToken(token);
      setIsAuthenticated(true);
      fetchModels();
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(AUTH_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();

      if (data.success) {
        setAdminToken(data.token);
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        toast({ title: 'Успех!', description: 'Вы вошли в админ-панель' });
        fetchModels();
      } else {
        toast({ title: 'Ошибка', description: data.error, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось войти', variant: 'destructive' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken('');
    setIsAuthenticated(false);
    setLoginForm({ username: '', password: '' });
    navigate('/');
  };

  const fetchModels = async () => {
    setLoading(true);
    try {
      const response = await fetch(MODELS_API);
      const data = await response.json();
      setModels(data.models || []);
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить модели', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingModel(null);
    setModelForm({
      name: '',
      category: 'basic',
      imageUrl: '',
      height: 170,
      measurements: '',
      experienceYears: 0,
      pricePerHour: 0,
      description: '',
      isAvailable: true
    });
    setUploadState({ uploading: false, preview: '' });
    setIsDialogOpen(true);
  };

  const openEditDialog = (model: Model) => {
    setEditingModel(model);
    setModelForm({
      id: model.id,
      name: model.name,
      category: model.category,
      imageUrl: model.imageUrl,
      height: model.height,
      measurements: model.measurements,
      experienceYears: model.experienceYears,
      pricePerHour: model.pricePerHour,
      description: model.description,
      isAvailable: model.isAvailable
    });
    setUploadState({ uploading: false, preview: model.imageUrl });
    setIsDialogOpen(true);
  };

  const handleSaveModel = async () => {
    const method = editingModel ? 'PUT' : 'POST';
    
    try {
      const response = await fetch(ADMIN_MODELS_API, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': adminToken
        },
        body: JSON.stringify(modelForm)
      });

      const data = await response.json();

      if (data.success) {
        toast({ title: 'Успех!', description: data.message });
        setIsDialogOpen(false);
        fetchModels();
      } else {
        toast({ title: 'Ошибка', description: data.error, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось сохранить модель', variant: 'destructive' });
    }
  };

  const handleDeleteModel = async (modelId: number) => {
    if (!confirm('Вы уверены, что хотите скрыть эту модель?')) return;

    try {
      const response = await fetch(`${ADMIN_MODELS_API}?id=${modelId}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-Token': adminToken
        }
      });

      const data = await response.json();

      if (data.success) {
        toast({ title: 'Успех!', description: data.message });
        fetchModels();
      } else {
        toast({ title: 'Ошибка', description: data.error, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить модель', variant: 'destructive' });
    }
  };

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

        const response = await fetch(UPLOAD_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64String })
        });

        const data = await response.json();

        if (data.success) {
          setModelForm({ ...modelForm, imageUrl: data.url });
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

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'luxury': return 'Люкс';
      case 'premium': return 'Премиум';
      case 'basic': return 'Базовые';
      default: return category;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black/5 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-playfair">Админ-панель</CardTitle>
            <CardDescription>Войдите для управления моделями</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button className="w-full bg-black hover:bg-black/90" onClick={handleLogin}>
              Войти
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
              На главную
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-playfair font-bold">Админ-панель</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>
              <Icon name="Home" size={18} className="mr-2" />
              На сайт
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-playfair font-bold">Управление моделями</h2>
          <Button className="bg-black hover:bg-black/90" onClick={openCreateDialog}>
            <Icon name="Plus" size={18} className="mr-2" />
            Добавить модель
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        ) : (
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
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(model)}>
                          <Icon name="Pencil" size={16} />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteModel(model.id)}>
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  onChange={(e) => setModelForm({ ...modelForm, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Категория *</Label>
                <Select value={modelForm.category} onValueChange={(value) => setModelForm({ ...modelForm, category: value })}>
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
                onChange={(e) => setModelForm({ ...modelForm, imageUrl: e.target.value })}
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
                  onChange={(e) => setModelForm({ ...modelForm, height: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="measurements">Параметры</Label>
                <Input
                  id="measurements"
                  value={modelForm.measurements}
                  onChange={(e) => setModelForm({ ...modelForm, measurements: e.target.value })}
                  placeholder="90-60-90"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Опыт (лет)</Label>
                <Input
                  id="experience"
                  type="number"
                  value={modelForm.experienceYears}
                  onChange={(e) => setModelForm({ ...modelForm, experienceYears: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Цена за час (₽) *</Label>
              <Input
                id="price"
                type="number"
                value={modelForm.pricePerHour}
                onChange={(e) => setModelForm({ ...modelForm, pricePerHour: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={modelForm.description}
                onChange={(e) => setModelForm({ ...modelForm, description: e.target.value })}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSaveModel} className="bg-black hover:bg-black/90">
              {editingModel ? 'Сохранить' : 'Добавить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;