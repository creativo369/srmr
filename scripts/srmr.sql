-- public."Clientes" definition

-- Drop table

-- DROP TABLE public."Clientes";

CREATE TABLE public."Clientes" (
	id bigserial NOT NULL,
	cedula int8 NULL,
	nombre varchar(255) NULL,
	apellido varchar(255) NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "Clientes_cedula_key" null,
	CONSTRAINT "Clientes_pkey" null
);

-- Permissions

ALTER TABLE public."Clientes" OWNER TO postgres;
GRANT ALL ON TABLE public."Clientes" TO postgres;


-- public."Rangos" definition

-- Drop table

-- DROP TABLE public."Rangos";

CREATE TABLE public."Rangos" (
	id bigserial NOT NULL,
	rango varchar(255) NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "Rangos_pkey" null
);

-- Permissions

ALTER TABLE public."Rangos" OWNER TO postgres;
GRANT ALL ON TABLE public."Rangos" TO postgres;


-- public."Reservas" definition

-- Drop table

-- DROP TABLE public."Reservas";

CREATE TABLE public."Reservas" (
	id bigserial NOT NULL,
	fecha date NULL,
	"cantidadSolicitada" int8 NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	fk_restauranteid int8 NULL,
	fk_mesaid int8 NULL,
	fk_clienteid int8 NULL,
	fk_rangoid int8 NULL,
	CONSTRAINT "Reservas_pkey" null
);

-- Permissions

ALTER TABLE public."Reservas" OWNER TO postgres;
GRANT ALL ON TABLE public."Reservas" TO postgres;


-- public."Restaurantes" definition

-- Drop table

-- DROP TABLE public."Restaurantes";

CREATE TABLE public."Restaurantes" (
	id bigserial NOT NULL,
	nombre varchar(255) NULL,
	direccion varchar(255) NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "Restaurantes_pkey" null
);

-- Permissions

ALTER TABLE public."Restaurantes" OWNER TO postgres;
GRANT ALL ON TABLE public."Restaurantes" TO postgres;


-- public."Mesas" definition

-- Drop table

-- DROP TABLE public."Mesas";

CREATE TABLE public."Mesas" (
	id bigserial NOT NULL,
	nombre varchar(255) NULL,
	"posicionX" int8 NULL,
	"posicionY" int8 NULL,
	planta int8 NULL DEFAULT 1,
	capacidad int8 NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	fk_restauranteid int8 NULL,
	CONSTRAINT "Mesas_pkey" null,
	CONSTRAINT "Mesas_fk_restauranteid_fkey" null
);

-- Permissions

ALTER TABLE public."Mesas" OWNER TO postgres;
GRANT ALL ON TABLE public."Mesas" TO postgres;
