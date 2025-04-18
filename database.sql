create table niche (
  id serial primary key,
  niche_name text not null,
  example_products text,
  backend_use text
);

insert into niche (niche_name, example_products, backend_use) values
('Personal Care', 'Serums, oils, cleansers', 'Bundle suggestions, influencer drops, seasonal routines'),
('Fashion & Apparel', 'Hoodies, leggings, tees', 'Drop forecasting, hype simulation, seasonal campaigns'),
('Health & Wellness', 'Protein, candles, vitamins', 'Subscription reminders, refill alerts, sentiment & value aligned media'),
('Jewelry & Accessories', 'Rings, necklaces, gift sets', 'Gifting campaigns, evergreen SKU suggestions'),
('Pet Care', 'Treats, toys, wellness items', 'Humanized campaigns, seasonal pet content with LLM'),
('Home & Lifestyle', 'Art prints, rugs, organizers', 'Trending aesthetics recommender, IG/TikTok-inspired planning'),
('Food & Consumables', 'Healthy bars, niche sauces', 'Impulse-focused drops, forecasted stock with campaign planning'),
('Digital Goods', 'Planners, templates, online courses', 'Evergreen content simulation, trend-based tags');



create table product (
  id serial primary key,
  name text not null,
  category text,
  niche_id integer references niche(id) on delete cascade
);

create table idea (
  id serial primary key,
  media text,
  media_mode text,
  media_type text,
  niche_id integer references niche(id) on delete cascade
);

create table media_plan (
  id serial primary key,
  title text,
  date date,
  description text,
  niche_id integer references niche(id) on delete cascade
);


create table peak (
  id serial primary key,
  title text,
  date date,
  description text,
  niche_id integer references niche(id) on delete cascade
);

create table niche_insight (
  id serial primary key,
  niche_id integer references niche(id) on delete cascade,
  example_products text,
  sales_pattern text,
  backend text
);


