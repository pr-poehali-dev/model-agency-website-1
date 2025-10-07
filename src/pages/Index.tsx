import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface BookingForm {
  modelId: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  bookingDate: string;
  hours: number;
  notes: string;
}

const Index = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    modelId: 0,
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    bookingDate: '',
    hours: 2,
    notes: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const MODELS_API = 'https://functions.poehali.dev/fda65910-2f69-4b23-be36-4259b965eca3';
  const BOOKING_API = 'https://functions.poehali.dev/5d14d914-ad90-4ba9-8289-b8a098e43c81';

  useEffect(() => {
    fetchModels();
  }, [selectedCategory]);

  const fetchModels = async () => {
    setLoading(true);
    try {
      const url = selectedCategory !== 'all' 
        ? `${MODELS_API}?category=${selectedCategory}`
        : MODELS_API;
      
      const response = await fetch(url);
      const data = await response.json();
      setModels(data.models || []);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить каталог моделей',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (model: Model) => {
    setSelectedModel(model);
    setBookingForm({
      ...bookingForm,
      modelId: model.id
    });
    setIsDialogOpen(true);
  };

  const submitBooking = async () => {
    if (!bookingForm.clientName || !bookingForm.clientEmail || !bookingForm.bookingDate) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive'
      });
      return;
    }

    try {
      const response = await fetch(BOOKING_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingForm)
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Успех!',
          description: data.message
        });
        setIsDialogOpen(false);
        setBookingForm({
          modelId: 0,
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          bookingDate: '',
          hours: 2,
          notes: ''
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать бронирование',
        variant: 'destructive'
      });
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'luxury': return 'bg-gold text-black';
      case 'premium': return 'bg-primary text-white';
      case 'basic': return 'bg-secondary text-black';
      default: return 'bg-muted';
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-playfair font-bold tracking-tight">LUXURY MODELS</h1>
          <nav className="hidden md:flex gap-8">
            <a href="#catalog" className="text-sm font-lato hover:text-gold transition-colors">Каталог</a>
            <a href="#services" className="text-sm font-lato hover:text-gold transition-colors">Услуги</a>
            <a href="#contact" className="text-sm font-lato hover:text-gold transition-colors">Контакты</a>
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
              <Icon name="Lock" size={16} className="mr-2" />
              Админ
            </Button>
          </nav>
          <Button variant="outline" className="md:hidden">
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </header>

      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-b from-black/5 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h2 className="text-6xl md:text-8xl font-playfair font-bold mb-6 tracking-tight">
            Premium Models
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl font-lato text-muted-foreground max-w-2xl mx-auto mb-8">
            Элитное модельное агентство международного уровня
          </p>
          <Button size="lg" className="bg-black hover:bg-black/90 text-white px-8 py-6 text-lg">
            <a href="#catalog">Смотреть каталог</a>
          </Button>
        </div>
      </section>

      <section id="catalog" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-playfair font-bold mb-4">Наш Каталог</h2>
          <div className="w-16 h-1 bg-gold mx-auto"></div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-12">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="luxury">Люкс</TabsTrigger>
            <TabsTrigger value="premium">Премиум</TabsTrigger>
            <TabsTrigger value="basic">Базовые</TabsTrigger>
          </TabsList>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="animate-pulse">
                  <div className="h-96 bg-muted"></div>
                  <CardHeader>
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {models.map(model => (
                <Card key={model.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-scale-in group">
                  <div className="relative h-96 overflow-hidden">
                    <img 
                      src={model.imageUrl} 
                      alt={model.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className={`absolute top-4 right-4 ${getCategoryBadgeColor(model.category)}`}>
                      {getCategoryLabel(model.category)}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-playfair">{model.name}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Ruler" size={16} />
                        <span>{model.height} см • {model.measurements}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Award" size={16} />
                        <span>{model.experienceYears} {model.experienceYears === 1 ? 'год' : 'лет'} опыта</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{model.description}</p>
                    <p className="text-2xl font-playfair font-bold mt-4">
                      {model.pricePerHour.toLocaleString('ru-RU')} ₽
                      <span className="text-sm font-lato font-normal text-muted-foreground"> / час</span>
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-black hover:bg-black/90"
                      onClick={() => handleBooking(model)}
                    >
                      Забронировать
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </Tabs>
      </section>

      <section id="services" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-playfair font-bold mb-4">Наши Услуги</h2>
            <div className="w-16 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Camera" size={32} className="text-gold" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-2">Фотосессии</h3>
              <p className="text-muted-foreground">Профессиональные модели для каталогов, рекламы и редакционных съёмок</p>
            </Card>
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Video" size={32} className="text-gold" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-2">Видеосъёмка</h3>
              <p className="text-muted-foreground">Модели для рекламных роликов, клипов и презентационных видео</p>
            </Card>
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Sparkles" size={32} className="text-gold" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-2">Мероприятия</h3>
              <p className="text-muted-foreground">Модели для подиумных показов, презентаций и корпоративных событий</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl font-playfair font-bold mb-4">Контакты</h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>
          <div className="space-y-4 text-lg">
            <div className="flex items-center justify-center gap-3">
              <Icon name="Phone" size={20} className="text-gold" />
              <a href="tel:+74951234567" className="hover:text-gold transition-colors">+7 (495) 123-45-67</a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Icon name="Mail" size={20} className="text-gold" />
              <a href="mailto:info@luxurymodels.ru" className="hover:text-gold transition-colors">info@luxurymodels.ru</a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Icon name="MapPin" size={20} className="text-gold" />
              <span>Москва, Тверская ул., 1</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-lato">&copy; 2025 Luxury Models. Все права защищены.</p>
        </div>
      </footer>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl">Бронирование модели</DialogTitle>
            <DialogDescription>
              {selectedModel && `${selectedModel.name} • ${selectedModel.pricePerHour.toLocaleString('ru-RU')} ₽/час`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя *</Label>
              <Input 
                id="name" 
                value={bookingForm.clientName}
                onChange={(e) => setBookingForm({...bookingForm, clientName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email" 
                type="email"
                value={bookingForm.clientEmail}
                onChange={(e) => setBookingForm({...bookingForm, clientEmail: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input 
                id="phone" 
                type="tel"
                value={bookingForm.clientPhone}
                onChange={(e) => setBookingForm({...bookingForm, clientPhone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Дата съёмки *</Label>
              <Input 
                id="date" 
                type="date"
                value={bookingForm.bookingDate}
                onChange={(e) => setBookingForm({...bookingForm, bookingDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours">Количество часов *</Label>
              <Input 
                id="hours" 
                type="number"
                min="1"
                value={bookingForm.hours}
                onChange={(e) => setBookingForm({...bookingForm, hours: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Примечания</Label>
              <Textarea 
                id="notes"
                value={bookingForm.notes}
                onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                placeholder="Опишите детали съёмки..."
              />
            </div>
            {selectedModel && (
              <div className="bg-gold/10 p-4 rounded-lg">
                <p className="font-playfair font-bold text-lg">
                  Итого: {(selectedModel.pricePerHour * bookingForm.hours).toLocaleString('ru-RU')} ₽
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={submitBooking} className="bg-black hover:bg-black/90">
              Забронировать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;