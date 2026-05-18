"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";

type PetType = "dog-small" | "dog-medium" | "cat";
type ServiceType = "bath" | "style" | "spa";

const slides = [
  { src: "/images/carousel-reception.jpg", label: "接待区" },
  { src: "/images/carousel-lobby.jpg", label: "等候区" },
  { src: "/images/carousel-grooming.jpg", label: "护理区" },
  { src: "/images/carousel-styling.jpg", label: "造型区" }
];

const prices: Record<PetType, Record<ServiceType, number>> = {
  "dog-small": { bath: 88, style: 198, spa: 148 },
  "dog-medium": { bath: 138, style: 268, spa: 198 },
  cat: { bath: 168, style: 238, spa: 228 }
};

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeGallery, setActiveGallery] = useState(0);
  const [petType, setPetType] = useState<PetType>("dog-small");
  const [serviceType, setServiceType] = useState<ServiceType>("bath");
  const [showToast, setShowToast] = useState(false);

  const estimate = useMemo(
    () => prices[petType][serviceType],
    [petType, serviceType]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
      setActiveGallery((current) => (current + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!showToast) {
      return;
    }

    const timer = window.setTimeout(() => setShowToast(false), 3200);
    return () => window.clearTimeout(timer);
  }, [showToast]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setPetType("dog-small");
    setServiceType("bath");
    setShowToast(true);
  }

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="暖爪宠物洗护店首页">
          <span className="brand-mark">爪</span>
          <span>暖爪宠物洗护店</span>
        </a>
        <nav className="nav" aria-label="主导航">
          <a href="#services">洗护服务</a>
          <a href="#pricing">价目预约</a>
          <a href="#gallery">门店环境</a>
          <a href="#visit">到店信息</a>
        </nav>
        <a className="btn" href="#booking" aria-label="前往预约表单">
          预约
        </a>
      </header>

      <main id="home">
        <section className="hero" aria-label="暖爪宠物洗护店">
          <div className="hero-slider" aria-hidden="true">
            {slides.map((slide, index) => (
              <div
                className={`hero-slide${activeSlide === index ? " is-active" : ""}`}
                key={slide.src}
              >
                <Image src={slide.src} alt="" width={1600} height={1000} priority={index === 0} />
              </div>
            ))}
          </div>
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">独立烘干间 · 一宠一巾 · 温和低敏</p>
              <h1>暖爪宠物洗护店</h1>
              <p>
                给猫猫狗狗一套不赶时间的洗护流程：皮毛评估、舒缓清洁、造型修剪、耳眼护理和回家前的状态记录。
              </p>
              <div className="hero-actions">
                <a className="btn" href="#booking">
                  现在预约
                </a>
                <a className="btn secondary" href="tel:13800008888">
                  电话咨询
                </a>
              </div>
            </div>
          </div>
          <div className="hero-dots" aria-label="轮播图切换">
            {slides.map((slide, index) => (
              <button
                className={`hero-dot${activeSlide === index ? " is-active" : ""}`}
                key={slide.label}
                type="button"
                aria-label={slide.label}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </section>

        <div className="quick-strip" aria-label="门店优势">
          <div className="quick-item">
            <strong>45-120 分钟</strong>
            <span>按体型与毛量安排时段</span>
          </div>
          <div className="quick-item">
            <strong>全程可追踪</strong>
            <span>洗护完成发送照片与护理建议</span>
          </div>
          <div className="quick-item">
            <strong>猫狗分区</strong>
            <span>降低陌生气味与环境压力</span>
          </div>
          <div className="quick-item">
            <strong>会员 9 折</strong>
            <span>次卡、包月护理可自由选择</span>
          </div>
        </div>

        <section className="services" id="services">
          <div className="section-inner">
            <div className="section-head">
              <h2>洗护服务</h2>
              <p>从日常清洁到换季护理，流程按宠物的年龄、皮肤状态和性格做细节调整。</p>
            </div>
            <div className="service-grid">
              <article className="service-card">
                <div className="service-visual" aria-hidden="true">
                  浴
                </div>
                <div>
                  <h3>基础香波洗</h3>
                  <p>温和清洁、耳眼护理、指甲修剪、脚底毛清理和基础吹干梳理。</p>
                  <div className="tag-row">
                    <span className="tag">适合日常</span>
                    <span className="tag">45 分钟起</span>
                  </div>
                </div>
              </article>
              <article className="service-card">
                <div className="service-visual" aria-hidden="true">
                  剪
                </div>
                <div>
                  <h3>精修造型</h3>
                  <p>按脸型、毛量和主人偏好修剪，包含拍照沟通和局部精修确认。</p>
                  <div className="tag-row">
                    <span className="tag">造型沟通</span>
                    <span className="tag">拍照确认</span>
                  </div>
                </div>
              </article>
              <article className="service-card">
                <div className="service-visual" aria-hidden="true">
                  猫
                </div>
                <div>
                  <h3>猫咪舒缓洗护</h3>
                  <p>预约制安静时段，低噪吹干、减少等待，适合敏感和第一次洗护的猫咪。</p>
                  <div className="tag-row">
                    <span className="tag">猫狗分时</span>
                    <span className="tag">低噪设备</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="pricing">
          <div className="section-inner price-layout">
            <div>
              <div className="section-head">
                <h2>价目与预约</h2>
              </div>
              <div className="price-card">
                <h3>基础价目</h3>
                <p>最终价格会根据毛结、体型、行为配合度和护理项目确认。</p>
                <div className="price-list">
                  <div className="price-row">
                    <span>小型犬基础洗护</span>
                    <strong>¥88 起</strong>
                  </div>
                  <div className="price-row">
                    <span>中大型犬基础洗护</span>
                    <strong>¥138 起</strong>
                  </div>
                  <div className="price-row">
                    <span>猫咪舒缓洗护</span>
                    <strong>¥168 起</strong>
                  </div>
                  <div className="price-row">
                    <span>精修造型</span>
                    <strong>¥198 起</strong>
                  </div>
                  <div className="price-row">
                    <span>药浴护理</span>
                    <strong>¥60 起</strong>
                  </div>
                </div>
              </div>
            </div>

            <form className="booking-panel" id="booking" onSubmit={handleSubmit}>
              <h3>快速预约</h3>
              <p>提交后店员会在营业时间内联系你确认具体时段。</p>
              <div className="form-grid">
                <label>
                  主人姓名
                  <input type="text" name="name" placeholder="例如：林小姐" required />
                </label>
                <label>
                  联系电话
                  <input type="tel" name="phone" placeholder="138 0000 8888" required />
                </label>
                <label>
                  宠物类型
                  <select
                    id="petType"
                    name="petType"
                    value={petType}
                    onChange={(event) => setPetType(event.target.value as PetType)}
                  >
                    <option value="dog-small">小型犬</option>
                    <option value="dog-medium">中大型犬</option>
                    <option value="cat">猫咪</option>
                  </select>
                </label>
                <label>
                  服务项目
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={serviceType}
                    onChange={(event) => setServiceType(event.target.value as ServiceType)}
                  >
                    <option value="bath">基础洗护</option>
                    <option value="style">精修造型</option>
                    <option value="spa">药浴护理</option>
                  </select>
                </label>
                <label>
                  预约日期
                  <input type="date" name="date" required />
                </label>
                <label>
                  到店时段
                  <select name="time" defaultValue="10:00 - 12:00">
                    <option>10:00 - 12:00</option>
                    <option>12:00 - 14:00</option>
                    <option>14:00 - 16:00</option>
                    <option>16:00 - 18:00</option>
                    <option>18:00 - 20:00</option>
                  </select>
                </label>
                <label className="span-2">
                  备注
                  <textarea
                    name="note"
                    placeholder="可以写宠物名字、体重、是否怕吹风、是否有皮肤问题"
                  />
                </label>
              </div>
              <div className="estimate">
                <span>预估到店价</span>
                <strong>¥{estimate} 起</strong>
              </div>
              <button className="btn" type="submit">
                提交预约
              </button>
            </form>
          </div>
        </section>

        <section className="gallery" id="gallery">
          <div className="section-inner">
            <div className="section-head">
              <h2>门店环境</h2>
              <p>用连续播放的环境图快速预览接待、等候、护理和造型空间，后续可替换为真实门店照片。</p>
            </div>
            <div className="gallery-player" aria-label="门店环境播放图">
              {slides.map((slide, index) => (
                <figure
                  className={`gallery-frame${activeGallery === index ? " is-active" : ""}`}
                  key={slide.src}
                  aria-hidden={activeGallery !== index}
                >
                  <Image
                    src={slide.src}
                    alt={`高端宠物洗护店${slide.label}环境参考图`}
                    width={1440}
                    height={860}
                  />
                  <span>{slide.label}</span>
                </figure>
              ))}
              <button
                className="gallery-arrow gallery-arrow-left"
                type="button"
                aria-label="上一张环境图"
                onClick={() => setActiveGallery((current) => (current + slides.length - 1) % slides.length)}
              >
                ‹
              </button>
              <button
                className="gallery-arrow gallery-arrow-right"
                type="button"
                aria-label="下一张环境图"
                onClick={() => setActiveGallery((current) => (current + 1) % slides.length)}
              >
                ›
              </button>
              <div className="gallery-dots" aria-label="环境图切换">
                {slides.map((slide, index) => (
                  <button
                    className={`gallery-dot${activeGallery === index ? " is-active" : ""}`}
                    key={slide.label}
                    type="button"
                    aria-label={slide.label}
                    onClick={() => setActiveGallery(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="section-inner">
            <div className="section-head">
              <h2>顾客反馈</h2>
              <p>每次洗护结束都会记录毛发、皮肤、耳眼和爪垫状态，方便下次继续跟进。</p>
            </div>
            <div className="reviews">
              <article className="review-card">
                <div className="stars" aria-label="五星评价">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <p>我家狗很怕吹风，店员会分段休息，最后毛也吹得很透，回家没有湿味。</p>
                <strong>可乐的主人</strong>
              </article>
              <article className="review-card">
                <div className="stars" aria-label="五星评价">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <p>猫咪第一次洗澡没有炸毛，照片和护理建议发得很细，感觉很安心。</p>
                <strong>年糕的主人</strong>
              </article>
              <article className="review-card">
                <div className="stars" aria-label="五星评价">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <p>修剪会先沟通想要的长度，脚底和耳朵处理得干净，价格也说得清楚。</p>
                <strong>布丁的主人</strong>
              </article>
            </div>
          </div>
        </section>

        <section className="visit" id="visit">
          <div className="section-inner">
            <div className="section-head">
              <h2>到店信息</h2>
              <p>建议提前一天预约，节假日和换季高峰请尽量预留更充裕的时间。</p>
            </div>
            <div className="visit-grid">
              <div className="map-box">
                <h3>暖爪宠物洗护店</h3>
                <p>上海市静安区花园路 88 号 1 层</p>
              </div>
              <div className="visit-info">
                <div>
                  <span>营业时间</span>
                  周一至周日 10:00 - 20:00
                </div>
                <div>
                  <span>预约电话</span>
                  138-0000-8888
                </div>
                <div>
                  <span>到店提醒</span>
                  首次到店请带好疫苗记录，皮肤敏感宠物请提前告知。
                </div>
                <div>
                  <span>社群福利</span>
                  进店扫码加入会员群，可领取换季护理券。
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>© 2026 暖爪宠物洗护店 · 洗得干净，也照顾小情绪</footer>

      <div className={`toast${showToast ? " show" : ""}`} role="status" aria-live="polite">
        预约信息已记录，我们会尽快联系你确认时段。
      </div>
    </>
  );
}
