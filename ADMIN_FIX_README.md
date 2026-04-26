# Admin Fix

تم إصلاح خطأ:
recentOrders is not defined

بعد فك الضغط:
npm install
npm run dev

لو بتستخدم Supabase لازم تضيف إيميل الأدمن في جدول admins:
insert into public.admins (email, name, role)
values ('donia@gmail.com', 'Fashion Store Admin', 'owner')
on conflict (email) do update set is_active = true, role = 'owner', updated_at = now();
