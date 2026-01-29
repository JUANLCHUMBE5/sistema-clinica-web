--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: access; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA access;


ALTER SCHEMA access OWNER TO postgres;

--
-- Name: consultorios; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA consultorios;


ALTER SCHEMA consultorios OWNER TO postgres;

--
-- Name: modules; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA modules;


ALTER SCHEMA modules OWNER TO postgres;

--
-- Name: users; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA users;


ALTER SCHEMA users OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: modules; Type: TABLE; Schema: access; Owner: postgres
--

CREATE TABLE access.modules (
    pk1 integer,
    status boolean,
    module text,
    created timestamp without time zone
);


ALTER TABLE access.modules OWNER TO postgres;

--
-- Name: specialties; Type: TABLE; Schema: access; Owner: postgres
--

CREATE TABLE access.specialties (
    pk1 integer,
    name text,
    description text,
    status boolean,
    created timestamp without time zone,
    espcialidad boolean DEFAULT true
);


ALTER TABLE access.specialties OWNER TO postgres;

--
-- Name: specialties_seq; Type: SEQUENCE; Schema: access; Owner: postgres
--

CREATE SEQUENCE access.specialties_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE access.specialties_seq OWNER TO postgres;

--
-- Name: specialties_seq; Type: SEQUENCE OWNED BY; Schema: access; Owner: postgres
--

ALTER SEQUENCE access.specialties_seq OWNED BY access.specialties.pk1;


--
-- Name: buildings; Type: TABLE; Schema: consultorios; Owner: postgres
--

CREATE TABLE consultorios.buildings (
    pk1 integer NOT NULL,
    sigla text,
    nombre text,
    active boolean DEFAULT true,
    ubicacion text
);


ALTER TABLE consultorios.buildings OWNER TO postgres;

--
-- Name: building_pk1_seq; Type: SEQUENCE; Schema: consultorios; Owner: postgres
--

CREATE SEQUENCE consultorios.building_pk1_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE consultorios.building_pk1_seq OWNER TO postgres;

--
-- Name: building_pk1_seq; Type: SEQUENCE OWNED BY; Schema: consultorios; Owner: postgres
--

ALTER SEQUENCE consultorios.building_pk1_seq OWNED BY consultorios.buildings.pk1;


--
-- Name: offices; Type: TABLE; Schema: consultorios; Owner: postgres
--

CREATE TABLE consultorios.offices (
    pk1 integer NOT NULL,
    building_pk1 integer,
    door text,
    floor text,
    specialite_pk1 integer,
    aforo text DEFAULT '2'::text,
    status boolean DEFAULT true
);


ALTER TABLE consultorios.offices OWNER TO postgres;

--
-- Name: offices_pk1_seq; Type: SEQUENCE; Schema: consultorios; Owner: postgres
--

CREATE SEQUENCE consultorios.offices_pk1_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE consultorios.offices_pk1_seq OWNER TO postgres;

--
-- Name: offices_pk1_seq; Type: SEQUENCE OWNED BY; Schema: consultorios; Owner: postgres
--

ALTER SEQUENCE consultorios.offices_pk1_seq OWNED BY consultorios.offices.pk1;


--
-- Name: categories; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.categories (
    pk1 integer NOT NULL,
    category text NOT NULL,
    status boolean DEFAULT true,
    created timestamp without time zone DEFAULT now(),
    rol_pk1 integer
);


ALTER TABLE users.categories OWNER TO postgres;

--
-- Name: categories_pk1_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.categories_pk1_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE users.categories_pk1_seq OWNER TO postgres;

--
-- Name: categories_pk1_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.categories_pk1_seq OWNED BY users.categories.pk1;


--
-- Name: roles; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.roles (
    pk1 integer NOT NULL,
    rol text,
    "create" character(1),
    read character(1),
    delete character(1),
    update character(1),
    print character(1)
);


ALTER TABLE users.roles OWNER TO postgres;

--
-- Name: specialties; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.specialties (
    pk1 integer NOT NULL,
    siglas text,
    name text,
    description text,
    status boolean DEFAULT true,
    dtcreated timestamp without time zone DEFAULT now()
);


ALTER TABLE users.specialties OWNER TO postgres;

--
-- Name: specialties_pk1_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.specialties_pk1_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE users.specialties_pk1_seq OWNER TO postgres;

--
-- Name: specialties_pk1_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.specialties_pk1_seq OWNED BY users.specialties.pk1;


--
-- Name: users; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users (
    pk1 integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    category_pk1 integer,
    date_birth timestamp without time zone,
    gender text,
    marital_status text,
    dni text,
    description json,
    status boolean DEFAULT true
);


ALTER TABLE users.users OWNER TO postgres;

--
-- Name: users_pk1_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.users_pk1_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE users.users_pk1_seq OWNER TO postgres;

--
-- Name: users_pk1_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.users_pk1_seq OWNED BY users.users.pk1;


--
-- Name: buildings pk1; Type: DEFAULT; Schema: consultorios; Owner: postgres
--

ALTER TABLE ONLY consultorios.buildings ALTER COLUMN pk1 SET DEFAULT nextval('consultorios.building_pk1_seq'::regclass);


--
-- Name: offices pk1; Type: DEFAULT; Schema: consultorios; Owner: postgres
--

ALTER TABLE ONLY consultorios.offices ALTER COLUMN pk1 SET DEFAULT nextval('consultorios.offices_pk1_seq'::regclass);


--
-- Name: categories pk1; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.categories ALTER COLUMN pk1 SET DEFAULT nextval('users.categories_pk1_seq'::regclass);


--
-- Name: specialties pk1; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.specialties ALTER COLUMN pk1 SET DEFAULT nextval('users.specialties_pk1_seq'::regclass);


--
-- Name: users pk1; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users ALTER COLUMN pk1 SET DEFAULT nextval('users.users_pk1_seq'::regclass);


--
-- Data for Name: modules; Type: TABLE DATA; Schema: access; Owner: postgres
--

COPY access.modules (pk1, status, module, created) FROM stdin;
1	t	Registro	2025-06-24 00:58:03.607693
\.


--
-- Data for Name: specialties; Type: TABLE DATA; Schema: access; Owner: postgres
--

COPY access.specialties (pk1, name, description, status, created, espcialidad) FROM stdin;
\.


--
-- Data for Name: buildings; Type: TABLE DATA; Schema: consultorios; Owner: postgres
--

COPY consultorios.buildings (pk1, sigla, nombre, active, ubicacion) FROM stdin;
1	ED-A	Edificio A	t	\N
2	ED-B	Edificio B	t	\N
\.


--
-- Data for Name: offices; Type: TABLE DATA; Schema: consultorios; Owner: postgres
--

COPY consultorios.offices (pk1, building_pk1, door, floor, specialite_pk1, aforo, status) FROM stdin;
1	1	02	2	4	2	t
4	1	01	1	2	3	t
5	1	02	1	2	2	t
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.categories (pk1, category, status, created, rol_pk1) FROM stdin;
1	ADMINISTRATOR	t	2025-06-24 02:13:18.896267	1
2	DOCTOR	t	2025-06-24 02:13:18.896267	9
3	PACIENTE	t	2025-06-24 02:13:18.896267	3
4	RECEPCION	t	2025-06-24 02:13:18.896267	3
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.roles (pk1, rol, "create", read, delete, update, print) FROM stdin;
1	admin	Y	Y	Y	Y	Y
2	create-print	Y	Y	N	N	Y
3	view-print	N	Y	N	N	Y
4	update-print	N	Y	N	Y	Y
5	create	Y	Y	N	N	N
6	view	N	Y	N	N	N
7	update	N	Y	N	Y	Y
8	Mantenimiento	N	Y	Y	N	Y
9	create-update-print	Y	Y	N	Y	Y
\.


--
-- Data for Name: specialties; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.specialties (pk1, siglas, name, description, status, dtcreated) FROM stdin;
4	REHA	Rehabilitación	\N	t	2025-09-13 15:50:31.996049
1	MEDG	Medicina General	\N	t	2025-09-13 15:49:40.548535
3	PSIC	Psicologia	\N	t	2025-09-13 15:50:31.996049
2	ODON	Odontologia	\N	t	2025-09-13 15:50:31.996049
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users (pk1, email, password, firstname, lastname, category_pk1, date_birth, gender, marital_status, dni, description, status) FROM stdin;
19	fmendoza@dms.com	$2b$10$f6dcTVxkEYeRXxaq6EdcuOIQVT0hx7FfLnf5Lox/et0bQrfN.SF9y	fernando	mendoza apaza	2	1975-06-17 00:00:00	masculino	soltero	12396325	{"phone_main":"912345678","phone_alternative":"","address":"su casa 123 los alamos","specialty_pk1":"2","description":""}	t
17	gcabana@dms.com	$2b$10$8u5RpuMOuty8iK3rDaQAiOtmnG.Id49HW3qfJctNwNSE5zEKParq.	Guillermo Alejandro	Cabana Cáceres	3	1978-02-10 00:00:00	masculino	soltero	10671906	{"phone_main":"014599674","phone_alternative":"","address":"jr los amautas 1277 Zarate","blood_type":"O+","allergy":"","contact":{"name_contact":"","relation_contact":"","phone_contact":""},"proxy":{"name_proxy":"","relation_proxy":"","phone_proxy":""}}	t
1	admin@dms.com	$2b$10$lSZXEPm9XkfKeIqZu4NSQu1xqt0TqWjWEFeRAmSkSBco0ZKZ3ddOO	admin	admin	1	\N	\N	\N	\N	\N	t
18	riparraguirre@dms.com	$2b$10$s/XPomqzujYq6qkUo2z2G.UIDx1xI.dXIKW8pa5Rea22goHCCp5G6	Ricardo	Iparraguirre	3	1989-07-18 00:00:00	masculino	casado	12345679	{"phone_main":"961784897","phone_alternative":"","address":"jr los amautas 1277 Zarate","blood_type":"O-","allergy":"","contact":{"name_contact":"","relation_contact":"","phone_contact":""},"proxy":{"name_proxy":"","relation_proxy":"","phone_proxy":""}}	t
\.


--
-- Name: specialties_seq; Type: SEQUENCE SET; Schema: access; Owner: postgres
--

SELECT pg_catalog.setval('access.specialties_seq', 1, false);


--
-- Name: building_pk1_seq; Type: SEQUENCE SET; Schema: consultorios; Owner: postgres
--

SELECT pg_catalog.setval('consultorios.building_pk1_seq', 2, true);


--
-- Name: offices_pk1_seq; Type: SEQUENCE SET; Schema: consultorios; Owner: postgres
--

SELECT pg_catalog.setval('consultorios.offices_pk1_seq', 8, true);


--
-- Name: categories_pk1_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.categories_pk1_seq', 4, true);


--
-- Name: specialties_pk1_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.specialties_pk1_seq', 4, true);


--
-- Name: users_pk1_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.users_pk1_seq', 19, true);


--
-- Name: buildings buildings_pk; Type: CONSTRAINT; Schema: consultorios; Owner: postgres
--

ALTER TABLE ONLY consultorios.buildings
    ADD CONSTRAINT buildings_pk PRIMARY KEY (pk1);


--
-- Name: offices offices_pk; Type: CONSTRAINT; Schema: consultorios; Owner: postgres
--

ALTER TABLE ONLY consultorios.offices
    ADD CONSTRAINT offices_pk PRIMARY KEY (pk1);


--
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.categories
    ADD CONSTRAINT categories_pk UNIQUE (category);


--
-- Name: categories categories_pk_2; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.categories
    ADD CONSTRAINT categories_pk_2 PRIMARY KEY (pk1);


--
-- Name: roles roles_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.roles
    ADD CONSTRAINT roles_pk PRIMARY KEY (pk1);


--
-- Name: roles roles_uq; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.roles
    ADD CONSTRAINT roles_uq UNIQUE (rol);


--
-- Name: specialties specialties_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.specialties
    ADD CONSTRAINT specialties_pk PRIMARY KEY (pk1);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users
    ADD CONSTRAINT users_pk PRIMARY KEY (pk1);


--
-- Name: users users_uq; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users
    ADD CONSTRAINT users_uq UNIQUE (email);


--
-- Name: offices offices_buildings_pk1_fk; Type: FK CONSTRAINT; Schema: consultorios; Owner: postgres
--

ALTER TABLE ONLY consultorios.offices
    ADD CONSTRAINT offices_buildings_pk1_fk FOREIGN KEY (building_pk1) REFERENCES consultorios.buildings(pk1);


--
-- Name: offices offices_specialties_pk1_fk; Type: FK CONSTRAINT; Schema: consultorios; Owner: postgres
--

ALTER TABLE ONLY consultorios.offices
    ADD CONSTRAINT offices_specialties_pk1_fk FOREIGN KEY (specialite_pk1) REFERENCES users.specialties(pk1);


--
-- Name: categories categories_roles_pk1_fk; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.categories
    ADD CONSTRAINT categories_roles_pk1_fk FOREIGN KEY (rol_pk1) REFERENCES users.roles(pk1);


--
-- Name: users users_categories_pk1_fk; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users
    ADD CONSTRAINT users_categories_pk1_fk FOREIGN KEY (category_pk1) REFERENCES users.categories(pk1);


--
-- PostgreSQL database dump complete
--

