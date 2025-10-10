import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-duck-yellow flex items-center justify-center">
              <Icon name="Crown" size={20} className="text-background" />
            </div>
            <span className="text-2xl font-bold">Lucky Duck</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#games" className="text-foreground/80 hover:text-foreground transition-colors">Игры</a>
            <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">Преимущества</a>
            <a href="#crash" className="text-foreground/80 hover:text-foreground transition-colors">Crash</a>
            <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">О нас</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden md:inline-flex">
              Войти
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              Регистрация
            </Button>
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Icon name="TrendingUp" size={16} className="text-primary" />
                <span className="text-sm text-primary font-medium">Ведущая онлайн-стратегия</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Новая эра{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  онлайн казино
                </span>
              </h1>

              <p className="text-xl text-muted-foreground">
                7 уникальных режимов игры и лучший Crash в индустрии. 
                Мгновенные депозиты и выводы в любой валюте.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 h-14 px-8 text-lg">
                  Начать играть
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2">
                  <Icon name="Play" size={20} className="mr-2" />
                  Демо режим
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-primary">98.5%</div>
                  <div className="text-sm text-muted-foreground">RTP</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Поддержка</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Игроков</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card">
                <img 
                  src="https://cdn.poehali.dev/projects/3f7a7ede-851c-46e0-a137-898a0ddec838/files/934ca355-c71f-4f43-9cbb-73934f3d68f2.jpg"
                  alt="Lucky Duck"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="games" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              7 уникальных режимов игры
            </h2>
            <p className="text-xl text-muted-foreground">
              От классических слотов до инновационного Crash — выбирайте игру по душе
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/3f7a7ede-851c-46e0-a137-898a0ddec838/files/85aeb4e9-7199-427c-951b-e2f89dadfab2.jpg"
                  alt="Slots"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Sparkles" className="text-primary" size={20} />
                  <h3 className="text-2xl font-bold">Слоты</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Более 100 тематических слотов с высоким RTP и джекпотами
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Играть сейчас
                </Button>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/3f7a7ede-851c-46e0-a137-898a0ddec838/files/92dc9195-4cee-4243-ad97-719773f7abf0.jpg"
                  alt="Crash"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  Популярно
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="TrendingUp" className="text-primary" size={20} />
                  <h3 className="text-2xl font-bold">Crash</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Лучший Crash в индустрии — выводи до взрыва и умножай ставку
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Играть сейчас
                </Button>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/3f7a7ede-851c-46e0-a137-898a0ddec838/files/3c88a1b1-47aa-4335-8f55-cfb848a23ce2.jpg"
                  alt="Poker"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Heart" className="text-primary" size={20} />
                  <h3 className="text-2xl font-bold">Покер</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Классический покер и его вариации с живыми дилерами
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Играть сейчас
                </Button>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Dices" className="text-primary" size={20} />
                <h3 className="text-2xl font-bold">Dice</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Быстрые раунды с настраиваемой вероятностью выигрыша
              </p>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Играть сейчас
              </Button>
            </div>

            <div className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Coins" className="text-primary" size={20} />
                <h3 className="text-2xl font-bold">Roulette</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Европейская и американская рулетка с реалистичной физикой
              </p>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Играть сейчас
              </Button>
            </div>

            <div className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Target" className="text-primary" size={20} />
                <h3 className="text-2xl font-bold">Mines</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Стратегическая игра на удачу — открывай поля и избегай мин
              </p>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Играть сейчас
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Почему выбирают Lucky Duck
            </h2>
            <p className="text-xl text-muted-foreground">
              Честная игра, мгновенные выплаты и лучший сервис в индустрии
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="ShieldCheck" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Provably Fair</h3>
              <p className="text-muted-foreground">
                Проверяемая честность каждого раунда с открытым алгоритмом
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Zap" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Мгновенные выводы</h3>
              <p className="text-muted-foreground">
                Получайте выигрыш на счет в течение 1 минуты
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Wallet" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Любые валюты</h3>
              <p className="text-muted-foreground">
                Депозиты и выводы в крипте, картах и электронных кошельках
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="HeadphonesIcon" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Поддержка 24/7</h3>
              <p className="text-muted-foreground">
                Всегда на связи в чате, телеграм и по email
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="crash" className="py-20 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Icon name="Award" size={16} className="text-primary" />
                <span className="text-sm text-primary font-medium">Лучший в индустрии</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold">
                Легендарный{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Crash-режим
                </span>
              </h2>

              <p className="text-xl text-muted-foreground">
                Самый продвинутый и честный Crash в мире онлайн-казино. 
                Следи за графиком, забирай выигрыш до взрыва и умножай ставку до x1000.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-primary" size={14} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Provably Fair алгоритм</div>
                    <div className="text-muted-foreground">Проверяй честность каждого раунда</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-primary" size={14} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Мультиплеер режим</div>
                    <div className="text-muted-foreground">Играй с тысячами игроков онлайн</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-primary" size={14} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Авто-вывод</div>
                    <div className="text-muted-foreground">Установи цель и забирай автоматически</div>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-primary hover:bg-primary/90 h-14 px-8 text-lg">
                Попробовать Crash
                <Icon name="Rocket" size={20} className="ml-2" />
              </Button>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Текущий раунд</span>
                    <span className="text-2xl font-bold text-primary">2.47x</span>
                  </div>

                  <div className="aspect-video rounded-xl bg-background border border-border flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-pulse">
                        1.89x
                      </div>
                      <div className="text-muted-foreground">График растёт...</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-background border border-border">
                      <div className="text-sm text-muted-foreground mb-1">Макс. множитель</div>
                      <div className="text-2xl font-bold text-primary">127.8x</div>
                    </div>
                    <div className="p-4 rounded-xl bg-background border border-border">
                      <div className="text-sm text-muted-foreground mb-1">Игроков онлайн</div>
                      <div className="text-2xl font-bold">847</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Готов начать выигрывать?
            </h2>
            <p className="text-xl text-muted-foreground">
              Присоединяйся к тысячам игроков и получи бонус на первый депозит
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 h-14 px-8 text-lg">
                Начать играть
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2">
                Узнать больше
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 pt-12">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">200%</div>
                <div className="text-muted-foreground">Бонус на депозит</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">&lt;1 мин</div>
                <div className="text-muted-foreground">Вывод средств</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">5000+</div>
                <div className="text-muted-foreground">Довольных игроков</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-duck-yellow flex items-center justify-center">
                  <Icon name="Crown" size={20} className="text-background" />
                </div>
                <span className="text-2xl font-bold">Lucky Duck</span>
              </div>
              <p className="text-muted-foreground">
                Ведущее онлайн-казино с честной игрой и мгновенными выплатами
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Игры</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Слоты</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Crash</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Покер</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Рулетка</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">О нас</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Правила</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Provably Fair</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Чат 24/7</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Email</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Telegram</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Discord</a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 Lucky Duck. Все права защищены.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
