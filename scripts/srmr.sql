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
	CONSTRAINT "Clientes_cedula_key" UNIQUE (cedula),
	CONSTRAINT "Clientes_pkey" PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public."Clientes" OWNER TO postgres;
GRANT ALL ON TABLE public."Clientes" TO postgres;

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
	CONSTRAINT "Mesas_pkey" PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public."Mesas" OWNER TO postgres;
GRANT ALL ON TABLE public."Mesas" TO postgres;


-- public."Mesas" foreign keys

ALTER TABLE public."Mesas" ADD CONSTRAINT "Mesas_fk_restauranteid_fkey" FOREIGN KEY (fk_restauranteid) REFERENCES public."Restaurantes"(id) ON DELETE SET NULL ON UPDATE CASCADE;

-- public."Restaurantes" definition

-- Drop table

-- DROP TABLE public."Restaurantes";

CREATE TABLE public."Restaurantes" (
	id bigserial NOT NULL,
	nombre varchar(255) NULL,
	direccion varchar(255) NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "Restaurantes_pkey" PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public."Restaurantes" OWNER TO postgres;
GRANT ALL ON TABLE public."Restaurantes" TO postgres;
