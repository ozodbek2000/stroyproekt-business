import $ from "jquery";

const animateTitle = () => {
  /* ========================= 
     НАСТРОЙКИ (КРУТИ ТУТ) 
     ========================= */
  
  // расстояние движения по X (px)
  const MOVE_X = 240; // ⬅️ больше = сильнее движение
  
  // множитель длины прогресса (больше = медленнее по скроллу)
  const PROGRESS_MULTIPLIER = 1.6;
  
  // плавность (меньше = плавнее)
  const EASING = 0.035;

  /* ========================= 
     ЛОГИКА (НЕ ТРОГАТЬ) 
     ========================= */

  // Создаем массивы для хранения состояния каждого элемента
  const titleElements = [];
  const titleBottomElements = [];

  // Инициализируем каждый .bg-title элемент
  $(".bg-title").each(function(index) {
    titleElements.push({
      $el: $(this),
      currentX: -MOVE_X,
      targetX: -MOVE_X
    });
  });

  // Инициализируем каждый .bg-title-bottom элемент
  $(".bg-title-bottom").each(function(index) {
    titleBottomElements.push({
      $el: $(this),
      currentX: MOVE_X,
      targetX: MOVE_X
    });
  });

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();

    // Анимация для каждого .bg-title (движение влево)
    titleElements.forEach(item => {
      const elementTop = item.$el.offset().top;
      const start = elementTop - windowHeight * PROGRESS_MULTIPLIER;
      const end = elementTop + windowHeight * PROGRESS_MULTIPLIER;

      if (scrollTop > start && scrollTop < end) {
        let progress = (scrollTop - start) / (end - start);
        progress = Math.max(0, Math.min(1, progress));
        
        item.targetX = MOVE_X - MOVE_X * progress * 2;
        item.$el.css("opacity", progress);
      }
    });

    // Анимация для каждого .bg-title-bottom (движение вправо)
    titleBottomElements.forEach(item => {
      const elementTop = item.$el.offset().top;
      const start = elementTop - windowHeight * PROGRESS_MULTIPLIER;
      const end = elementTop + windowHeight * PROGRESS_MULTIPLIER;

      if (scrollTop > start && scrollTop < end) {
        let progress = (scrollTop - start) / (end - start);
        progress = Math.max(0, Math.min(1, progress));
        
        item.targetX = -MOVE_X + MOVE_X * progress * 2;
        item.$el.css("opacity", progress);
      }
    });
  });

  function animate() {
    // Обновляем позицию каждого .bg-title элемента
    titleElements.forEach(item => {
      item.currentX += (item.targetX - item.currentX) * EASING;
      item.$el.css("transform", `translate(${item.currentX}px, 80px)`);
    });

    // Обновляем позицию каждого .bg-title-bottom элемента
    titleBottomElements.forEach(item => {
      item.currentX += (item.targetX - item.currentX) * EASING;
      item.$el.css("transform", `translate(${item.currentX}px, 80px)`);
    });

    requestAnimationFrame(animate);
  }

  animate();
};

export default animateTitle;