

// Системные сервисы
import { MainRequest } from './MainRequest';

import { UserSys } from './UserSys';
import { ErrorSys } from './ErrorSys';


/**
 * Система логическая система
 * Логические функции управления приложением
 */
export class LogicSys {

    protected errorSys: ErrorSys;
	protected userSys: UserSys;
	protected req:MainRequest;

    constructor(req: MainRequest) {
		this.req = req;
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
	}

	/**
	 * Включить запросы на базу данных
	 */
	fMasterDBOn(){
		this.req.sys.bMasterDB = true;
	}

	/**
	 * Отключить запросы на мастер базу данных
	 */
	fMasterDBOff(){
		this.req.sys.bMasterDB = false;
	}

	/**
     * Логический блок
     * @param sError - Сообщение об ощибке
     * @param callback - функция содержащая логическую операцию
     */
    async ifOk(sError:string, callback:Function):Promise<any>{

        let out = null;
        if( this.errorSys.isOk() ){
            try{
                out = await callback();
                this.errorSys.devNotice('ifok', sError);
            } catch(e) {
				this.errorSys.error(`ifok`, sError);
				throw e;

            }
        } else {
			this.errorSys.error('ifok', sError);
        }

        return out;

    }

	/**
     * Блок для выполнения запросов на мастер базу данных
     * @param callback - функция содержащая логическую операцию
     */
    async faQueryMasterDB(sError:string, callback:Function):Promise<any>{

		this.req.sys.bMasterDB = true;

        let out = null;
		try{
			out = await callback();
			this.errorSys.devNotice('query_master_db', sError);
		} catch(e) {
			this.errorSys.error(`query_master_db`, sError);
			throw e;
		}

		this.req.sys.bMasterDB = false;

		return out;
    }
}