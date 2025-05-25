--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-05-25 20:27:24

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16785)
-- Name: assignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assignments (
    asset character varying NOT NULL,
    personnel character varying NOT NULL,
    status character varying NOT NULL
);


ALTER TABLE public.assignments OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16797)
-- Name: base; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base (
    base_name character varying(100) NOT NULL,
    location character varying(100),
    total_assets integer DEFAULT 0
);


ALTER TABLE public.base OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16642)
-- Name: login; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login (
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(100) NOT NULL
);


ALTER TABLE public.login OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16724)
-- Name: purchases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchases (
    base text NOT NULL,
    equipment_type text NOT NULL,
    quantity integer NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.purchases OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16745)
-- Name: transfers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transfers (
    asset text,
    from_base text NOT NULL,
    to_base text NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.transfers OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16572)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    username character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    role character varying(50) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4920 (class 0 OID 16785)
-- Dependencies: 221
-- Data for Name: assignments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assignments (asset, personnel, status) FROM stdin;
AK-47	Major Mukund Varadarajan	Assigned
M1 Abrams	Captain Vikram Batra	Assigned
M67	Captain Tushar Mahajan	Assigned
FN Scar	Major Somnath Sharma	Expended
M24	Lance Naik Karam Singh	Expended
M4 Carbine	Major Sandeep Unnikrishnan	Expended
T-90	Captain Manoj Kumar Pandey	Expended
Smoke granade	Major Dhan Singh Thapa 	Assigned
Glock 17	Lance Naik Albert Ekka	Assigned
Brahmos	Wing Commander Vyomika Singh	Assigned
AK-203	Colonel Sofiya Qureshi	Assigned
NAG Missile	Second Lieutenant Arun Khetarpal	Assigned
INS Vikramaditya	Lieutenant Ram	Assigned
Mirage 2000	Captain Anuj Nayyar 	Expended
\.


--
-- TOC entry 4921 (class 0 OID 16797)
-- Dependencies: 222
-- Data for Name: base; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.base (base_name, location, total_assets) FROM stdin;
\.


--
-- TOC entry 4917 (class 0 OID 16642)
-- Dependencies: 218
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login (username, password, role) FROM stdin;
admin	admin	Admin
admin2	admin	Admin
base	base	Base Commissioner
logistic	logistic	Logistic Officer
posa	posa	Logistic Officer
\.


--
-- TOC entry 4918 (class 0 OID 16724)
-- Dependencies: 219
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchases (base, equipment_type, quantity, date) FROM stdin;
A	M4 Carbine	20	2025-04-01
A	AK-47	24	2025-03-01
A	FN Scar	14	2025-04-12
A	M24	50	2025-02-01
B	M1 Abrams	3	2025-05-01
B	T-90	4	2025-05-01
B	M67	50	2025-05-01
B	Smoke granade	80	2025-04-11
A	Glock 17	60	2025-04-26
A	AK-203	75	2025-05-03
B	NAG Missile	15	2025-05-01
B	Mirage 2000	5	2025-03-06
B	BMP-2 Sarath	3	2025-01-10
B	INS Vikramaditya	5	2024-10-17
B	Brahmos	1	2024-05-16
A	Astra	4	2025-03-07
A	Nishant drone	4	2024-10-09
\.


--
-- TOC entry 4919 (class 0 OID 16745)
-- Dependencies: 220
-- Data for Name: transfers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transfers (asset, from_base, to_base, date) FROM stdin;
M4 Carbine	A	B	2025-05-15
AK-47	A	B	2025-05-15
Smoke granade	B	A	2025-05-16
Glock 17	A	B	2025-05-17
Nishant drone	A	B	2025-05-02
Mirage 2000	B	A	2025-05-03
BMP-2 Sarath	B	A	2025-05-15
\.


--
-- TOC entry 4916 (class 0 OID 16572)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (username, email, password, role) FROM stdin;
vishnu	posavishnu2003@gmail.com	$2b$10$ZxCzY/tWm7xh2GE/YBlbFu8i064T21OkGWKchIt3NlEjO6.oI6RWa	Admin
vardhan	v@gmail.com	$2b$10$xFtMlYDxY5B1Vz/azGNQ0.mSGX92wttrpSTRNWMwf.ZnylFSAo09a	Base Commisioner
rajesh	rajesh@gmail.com	$2b$10$exouRuM5pQYDAB/11FuISuFRiHiGj9etnLt955vbYDjfwvfHaQt8e	User
rajesh	var@gmail.com	$2b$10$7.TDKwFdkbHeQstePoHRHetHEkrA4zgdg2hlU9IsCN21vbcqSgdQC	Logistic Officer
rajesh	va@gmail.com	$2b$10$mCgKHzIz80KCt69lnpcgdeBjulZXjbRJVGU099qWD0S6eIYlVKAdK	Base Commissioner
admin	admin@gmail.com	admin	Admin
admin2	admin2@gmail.com	admin	Admin
base	base@gmail.com	base	Base Commissioner
logistic	logistic@gmail.com	logistic	Logistic Officer
posa	posa@gmail.com	posa	Logistic Officer
\.


--
-- TOC entry 4767 (class 2606 OID 16791)
-- Name: assignments assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT assignments_pkey PRIMARY KEY (asset);


--
-- TOC entry 4769 (class 2606 OID 16802)
-- Name: base base_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.base
    ADD CONSTRAINT base_pkey PRIMARY KEY (base_name);


--
-- TOC entry 4765 (class 2606 OID 16744)
-- Name: purchases unique_equipment_type; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT unique_equipment_type UNIQUE (equipment_type);


--
-- TOC entry 4763 (class 2606 OID 16578)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4770 (class 2606 OID 16750)
-- Name: transfers transfers_asset_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transfers
    ADD CONSTRAINT transfers_asset_fkey FOREIGN KEY (asset) REFERENCES public.purchases(equipment_type);


-- Completed on 2025-05-25 20:27:24

--
-- PostgreSQL database dump complete
--

