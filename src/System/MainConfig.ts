import { SeoConfigI } from '../Components/Seo';

export interface MainConfig { // Конфигурация
	// ================================
	mysql: { // Конфиг для MySql
		client: string, // mysql
		connection: { // Параметры соединения
			host: string; // "127.0.0.1"
			user: string; // Пользователь
			password: string; // Пароль
			database: string; // Имя базы данных
		},
		pool: { min: number, max: number }, // Количество соединений
		migrations: {
			tableName: string; // "knex_migrations",
			directory: string; // "./src/Infrastructure/SQL/Migrations"
		},
		acquireConnectionTimeout: number; // таймоут 60000
	};
	// ================================
	pgsql: { // Конфиг для Postgress
		dialect: string; // "postgres",
		username: string; // Имя пользователя,
		password: string; // Пароль
		host: string; // "127.0.0.1",
		port: number; // 5432,
		database: string; // Имя базы данных
		dialectOptions: {
			supportBigNumbers: true;
			decimalNumbers: true;
		}
	};
	// ================================
	redis: { // Конфиг для редиса
		url: string; // "redis://127.0.0.1:6379"
	};
	// ================================
	common: { // Общее
		env: string; // Тип окружения
		oldCoreURL: string; // URL адрес основного сайта
		errorMute: boolean;
		hook_url: string; // Сообщения об ошибках matermost
		port: number; // порт на котором будет работать экземпляр ноды
	};

	rabbit: {
		connection: string;
		queryList: string[];
	};

	S3: {
		endpoint: string;
		bucket: string;
		baseUrl: string;
		access: string;
		secret: string;
	},

	SeoConfig?: SeoConfigI

}