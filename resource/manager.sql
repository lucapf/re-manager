--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Ubuntu 16.6-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 17.2 (Ubuntu 17.2-1.pgdg24.04+1)

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

--
-- Name: dashboard; Type: SCHEMA; Schema: -; Owner: dashboard
--

CREATE SCHEMA dashboard;


ALTER SCHEMA dashboard OWNER TO dashboard;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: configuration; Type: TABLE; Schema: dashboard; Owner: dashboard
--

CREATE TABLE dashboard.configuration (
    key character varying(50) NOT NULL,
    int_value integer,
    str_value character varying(50),
    description character varying
);


ALTER TABLE dashboard.configuration OWNER TO dashboard;

--
-- Name: discarded_towers; Type: TABLE; Schema: dashboard; Owner: dashboard
--

CREATE TABLE dashboard.discarded_towers (
    community character varying(100),
    tower character varying(150),
    discarded_at date DEFAULT now(),
    discarded_to date DEFAULT (now() + '1 mon'::interval)
);


ALTER TABLE dashboard.discarded_towers OWNER TO dashboard;

--
-- Name: migrations; Type: TABLE; Schema: dashboard; Owner: dashboard
--

CREATE TABLE dashboard.migrations (
    statement_sha text NOT NULL
);


ALTER TABLE dashboard.migrations OWNER TO dashboard;

--
-- Name: propertyfinder; Type: TABLE; Schema: dashboard; Owner: dashboard
--

CREATE TABLE dashboard.propertyfinder (
    type character varying(40),
    price integer,
    size integer,
    bedrooms text,
    bathrooms character varying(2),
    price_sqft real,
    city character varying(15),
    community character varying(100),
    subcommunity character varying(100),
    tower text,
    location_slug character varying(200),
    location_name character varying(250),
    listed_date date,
    url character varying(250),
    price_history jsonb,
    file_path character varying(250),
    user_discarded boolean DEFAULT false,
    description text,
    latitude numeric(18,16),
    longitude numeric(18,16),
    id character varying(8) NOT NULL,
    report_id character varying(150),
    favorite boolean
);


ALTER TABLE dashboard.propertyfinder OWNER TO dashboard;

--
-- Name: propertyfinder_pulse_area_mapping; Type: TABLE; Schema: dashboard; Owner: dashboard
--

CREATE TABLE dashboard.propertyfinder_pulse_area_mapping (
    name character varying NOT NULL,
    pf_community character varying(100) NOT NULL,
    pulse_master_project character varying(50) NOT NULL,
    image character varying(150)
);


ALTER TABLE dashboard.propertyfinder_pulse_area_mapping OWNER TO dashboard;

--
-- Name: TABLE propertyfinder_pulse_area_mapping; Type: COMMENT; Schema: dashboard; Owner: dashboard
--

COMMENT ON TABLE dashboard.propertyfinder_pulse_area_mapping IS 'map propertyfinder and pulse areas (JLT, Dubai Marina, JVC...)';


--
-- Name: COLUMN propertyfinder_pulse_area_mapping.name; Type: COMMENT; Schema: dashboard; Owner: dashboard
--

COMMENT ON COLUMN dashboard.propertyfinder_pulse_area_mapping.name IS 'area name (default commintiry by propertyfinder)';


--
-- Name: propertyfinder_pulse_mapping; Type: TABLE; Schema: dashboard; Owner: dashboard
--

CREATE TABLE dashboard.propertyfinder_pulse_mapping (
    propertyfinder_community character varying(100) NOT NULL,
    propertyfinder_tower character varying(150) NOT NULL,
    pulse_master_project character varying(50) NOT NULL,
    pulse_building_name character varying(100) NOT NULL
);


ALTER TABLE dashboard.propertyfinder_pulse_mapping OWNER TO dashboard;

--
-- Name: propertyfinder_tower_mapping; Type: TABLE; Schema: dashboard; Owner: dashboard
--

CREATE TABLE dashboard.propertyfinder_tower_mapping (
    community character varying(100) NOT NULL,
    tower character varying(150)
);


ALTER TABLE dashboard.propertyfinder_tower_mapping OWNER TO dashboard;

--
-- Name: pulse; Type: TABLE; Schema: dashboard; Owner: dashboard
--

CREATE TABLE dashboard.pulse (
    transaction_id character varying(25) NOT NULL,
    procedure_id smallint,
    trans_group_id smallint,
    trans_group character varying(12),
    procedure_name character varying(50),
    instance_date date,
    property_type_id smallint,
    property_type character varying(12),
    property_sub_type_id numeric,
    property_sub_type character varying(20),
    property_usage character varying(50),
    reg_type_id smallint,
    reg_type character varying(20),
    area_id smallint,
    area_name character varying(50),
    building_name character varying(100),
    project_number integer,
    project_name character varying(100),
    master_project character varying(50),
    rooms character varying(12),
    has_parking smallint,
    procedure_area numeric(14,2),
    actual_worth numeric(14,2),
    meter_sale_price numeric(12,2),
    rent_value numeric(12,2),
    meter_rent_price numeric(12,2),
    size_sqft integer,
    price_sqft numeric(8,2),
    bedrooms character varying(50)
);


ALTER TABLE dashboard.pulse OWNER TO dashboard;

--
-- Name: COLUMN pulse.bedrooms; Type: COMMENT; Schema: dashboard; Owner: dashboard
--

COMMENT ON COLUMN dashboard.pulse.bedrooms IS 'normalized bedrooms value';


--
-- Name: pulse_tower_mapping; Type: TABLE; Schema: dashboard; Owner: dashboard
--

CREATE TABLE dashboard.pulse_tower_mapping (
    master_project character varying(50) NOT NULL,
    building_name character varying(100) NOT NULL
);


ALTER TABLE dashboard.pulse_tower_mapping OWNER TO dashboard;

--
-- Name: report; Type: TABLE; Schema: dashboard; Owner: dashboard
--

CREATE TABLE dashboard.report (
    community character varying(150) NOT NULL,
    num_ads integer,
    avg_size integer,
    avg_price_sqft numeric(16,2),
    created_at date
);


ALTER TABLE dashboard.report OWNER TO dashboard;

--
-- Name: TABLE report; Type: COMMENT; Schema: dashboard; Owner: dashboard
--

COMMENT ON TABLE dashboard.report IS 'main report table';


--
-- Name: report_per_period_statistics; Type: TABLE; Schema: dashboard; Owner: dashboard
--

CREATE TABLE dashboard.report_per_period_statistics (
    propertyfinder_id character varying(8) NOT NULL,
    "interval" character varying NOT NULL,
    min_price numeric(16,2),
    max_price numeric(16,2),
    avg_price numeric(16,2),
    max_price_sqft numeric(16,2),
    min_price_sqft numeric(16,2),
    avg_price_sqft numeric(16,2),
    current_vs_avg_perc numeric(16,2),
    community character varying(150),
    ad_price_sqft numeric(12,2),
    sale_transaction integer
);


ALTER TABLE dashboard.report_per_period_statistics OWNER TO dashboard;

--
-- Name: report_propertyfinder; Type: TABLE; Schema: dashboard; Owner: dashboard
--

CREATE TABLE dashboard.report_propertyfinder (
    propertyfinder_id character varying(8) NOT NULL,
    pulse_transaction_id character varying NOT NULL,
    score numeric(6,3) NOT NULL,
    community character varying(150) NOT NULL,
    is_spike boolean DEFAULT false
);


ALTER TABLE dashboard.report_propertyfinder OWNER TO dashboard;

--
-- Name: TABLE report_propertyfinder; Type: COMMENT; Schema: dashboard; Owner: dashboard
--

COMMENT ON TABLE dashboard.report_propertyfinder IS 'link adversiting to transactions.';


--
-- Name: COLUMN report_propertyfinder.is_spike; Type: COMMENT; Schema: dashboard; Owner: dashboard
--

COMMENT ON COLUMN dashboard.report_propertyfinder.is_spike IS 'if True that''s a spike and cannot be added to the report';


--
-- Name: reveal_sequence; Type: SEQUENCE; Schema: dashboard; Owner: dashboard
--

CREATE SEQUENCE dashboard.reveal_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE dashboard.reveal_sequence OWNER TO dashboard;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.migrations (
    statement_sha text NOT NULL
);


ALTER TABLE public.migrations OWNER TO dashboard;

--
-- Name: configuration configuration_pk; Type: CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.configuration
    ADD CONSTRAINT configuration_pk PRIMARY KEY (key);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (statement_sha);


--
-- Name: propertyfinder propertyfinder_pk; Type: CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.propertyfinder
    ADD CONSTRAINT propertyfinder_pk PRIMARY KEY (id);


--
-- Name: propertyfinder_pulse_area_mapping propertyfinder_pulse_area_mapping_pk; Type: CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.propertyfinder_pulse_area_mapping
    ADD CONSTRAINT propertyfinder_pulse_area_mapping_pk PRIMARY KEY (pf_community);


--
-- Name: propertyfinder_pulse_area_mapping propertyfinder_pulse_area_mapping_unique; Type: CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.propertyfinder_pulse_area_mapping
    ADD CONSTRAINT propertyfinder_pulse_area_mapping_unique UNIQUE (name);


--
-- Name: propertyfinder_pulse_mapping propertyfinder_pulse_mapping_pk; Type: CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.propertyfinder_pulse_mapping
    ADD CONSTRAINT propertyfinder_pulse_mapping_pk PRIMARY KEY (propertyfinder_community, propertyfinder_tower, pulse_master_project, pulse_building_name);


--
-- Name: propertyfinder_tower_mapping propertyfinder_tower_mapping_unique; Type: CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.propertyfinder_tower_mapping
    ADD CONSTRAINT propertyfinder_tower_mapping_unique UNIQUE (community, tower);


--
-- Name: pulse pulse_pkey; Type: CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.pulse
    ADD CONSTRAINT pulse_pkey PRIMARY KEY (transaction_id);


--
-- Name: pulse_tower_mapping pulse_tower_mapping_pk; Type: CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.pulse_tower_mapping
    ADD CONSTRAINT pulse_tower_mapping_pk PRIMARY KEY (master_project, building_name);


--
-- Name: report_per_period_statistics report_per_period_statistics_pk; Type: CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.report_per_period_statistics
    ADD CONSTRAINT report_per_period_statistics_pk PRIMARY KEY (propertyfinder_id, "interval");


--
-- Name: report report_pk; Type: CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.report
    ADD CONSTRAINT report_pk PRIMARY KEY (community);


--
-- Name: report_propertyfinder report_propertyfinder_pk; Type: CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.report_propertyfinder
    ADD CONSTRAINT report_propertyfinder_pk PRIMARY KEY (propertyfinder_id, pulse_transaction_id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (statement_sha);


--
-- Name: report_per_period_statistics per_period_statistics_propertyfinder_fk; Type: FK CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.report_per_period_statistics
    ADD CONSTRAINT per_period_statistics_propertyfinder_fk FOREIGN KEY (propertyfinder_id) REFERENCES dashboard.propertyfinder(id);


--
-- Name: propertyfinder_tower_mapping propertyfinder_tower_mapping_propertyfinder_pulse_area_mapping_; Type: FK CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.propertyfinder_tower_mapping
    ADD CONSTRAINT propertyfinder_tower_mapping_propertyfinder_pulse_area_mapping_ FOREIGN KEY (community) REFERENCES dashboard.propertyfinder_pulse_area_mapping(pf_community);


--
-- Name: report_propertyfinder report_propertyfinder_propertyfinder_fk; Type: FK CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.report_propertyfinder
    ADD CONSTRAINT report_propertyfinder_propertyfinder_fk FOREIGN KEY (propertyfinder_id) REFERENCES dashboard.propertyfinder(id);


--
-- Name: report_propertyfinder report_propertyfinder_pulse_fk; Type: FK CONSTRAINT; Schema: dashboard; Owner: dashboard
--

ALTER TABLE ONLY dashboard.report_propertyfinder
    ADD CONSTRAINT report_propertyfinder_pulse_fk FOREIGN KEY (pulse_transaction_id) REFERENCES dashboard.pulse(transaction_id);


--
-- PostgreSQL database dump complete
--

