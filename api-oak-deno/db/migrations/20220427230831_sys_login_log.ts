import { AbstractMigration, ClientPostgreSQL } from "../../deps.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await this.client.queryObject(`
    DROP TABLE IF EXISTS SYS_LOGIN_LOG;
    CREATE TABLE SYS_LOGIN_LOG(
        ID BIGINT NOT NULL,
        USER_ID BIGINT NOT NULL,
        USERNAME VARCHAR(50) NOT NULL,
        CLIENT_ID VARCHAR(50),
        TOKEN VARCHAR(50),
        MESSAGE VARCHAR(250),
        LOGIN_DATE BIGINT,
        LOGOUT_DATE BIGINT,
        REQUEST_URL VARCHAR(500),
        BOOL_LOGIN_SUCCESS_ENUM SMALLINT NOT NULL DEFAULT  '1',
        BOOL_NOW_ONLINE_ENUM SMALLINT NOT NULL DEFAULT  '1',
        OFFLINE_TYPE_ENUM SMALLINT,
        EXCEPTION_MSG VARCHAR(250),
        TENANT_ID BIGINT NOT NULL DEFAULT  '1',
        IP_ADDRESS VARCHAR(50),
        IP_REGION VARCHAR(100),
        IP_REGION_COUNTRY VARCHAR(50),
        IP_REGION_PROVINCE VARCHAR(50),
        IP_REGION_CITY VARCHAR(50),
        IP_REGION_ISP VARCHAR(50),
        USER_AGENT VARCHAR(500),
        DEVICE_NAME VARCHAR(50),
        OS_NAME VARCHAR(50),
        BROWSER_NAME VARCHAR(50),
        BROWSER_LOCALE VARCHAR(50),
        BOOL_NEW_USER_ENUM SMALLINT NOT NULL DEFAULT  '1',
        LOGIN_ORIGIN_ENUM SMALLINT NOT NULL DEFAULT  '1',
        CREATE_DATE BIGINT NOT NULL,
        CREATE_USER_ID BIGINT NOT NULL,
        PRIMARY KEY (ID)
    );
    
    COMMENT ON TABLE SYS_LOGIN_LOG IS '';
    COMMENT ON COLUMN SYS_LOGIN_LOG.ID IS '主键ID';
    COMMENT ON COLUMN SYS_LOGIN_LOG.USER_ID IS '用户ID:foreignKey';
    COMMENT ON COLUMN SYS_LOGIN_LOG.USERNAME IS '用户账号:oneParam;listParam';
    COMMENT ON COLUMN SYS_LOGIN_LOG.CLIENT_ID IS '客户端账号';
    COMMENT ON COLUMN SYS_LOGIN_LOG.TOKEN IS '登录成功令牌:oneParam';
    COMMENT ON COLUMN SYS_LOGIN_LOG.MESSAGE IS '记录信息';
    COMMENT ON COLUMN SYS_LOGIN_LOG.LOGIN_DATE IS '登录时间';
    COMMENT ON COLUMN SYS_LOGIN_LOG.LOGOUT_DATE IS '登出时间';
    COMMENT ON COLUMN SYS_LOGIN_LOG.REQUEST_URL IS '请求;URL';
    COMMENT ON COLUMN SYS_LOGIN_LOG.BOOL_LOGIN_SUCCESS_ENUM IS '是否登录成功:[1=是=YES,;2=否=NO]max=2';
    COMMENT ON COLUMN SYS_LOGIN_LOG.BOOL_NOW_ONLINE_ENUM IS '当前是否在线:[1=是=YES,;2=否=NO]max=2';
    COMMENT ON COLUMN SYS_LOGIN_LOG.OFFLINE_TYPE_ENUM IS '登出方式:[1=主动登出=PEOPLE_LOGOUT,;2=过期登出=EXPIRE_LOGOUT, 3=后台踢出=BACKEND_LOGOUT]max=2';
    COMMENT ON COLUMN SYS_LOGIN_LOG.EXCEPTION_MSG IS '失败异常信息';
    COMMENT ON COLUMN SYS_LOGIN_LOG.TENANT_ID IS '所属租户';
    COMMENT ON COLUMN SYS_LOGIN_LOG.IP_ADDRESS IS 'IP;地址';
    COMMENT ON COLUMN SYS_LOGIN_LOG.IP_REGION IS 'IP;信息';
    COMMENT ON COLUMN SYS_LOGIN_LOG.IP_REGION_COUNTRY IS 'IP;地址对应的国家';
    COMMENT ON COLUMN SYS_LOGIN_LOG.IP_REGION_PROVINCE IS 'IP;地址对应的省';
    COMMENT ON COLUMN SYS_LOGIN_LOG.IP_REGION_CITY IS 'IP;地址对应的市';
    COMMENT ON COLUMN SYS_LOGIN_LOG.IP_REGION_ISP IS 'IP;地址对应的网络提供商';
    COMMENT ON COLUMN SYS_LOGIN_LOG.USER_AGENT IS '浏览器;UserAgent';
    COMMENT ON COLUMN SYS_LOGIN_LOG.DEVICE_NAME IS '设备名称';
    COMMENT ON COLUMN SYS_LOGIN_LOG.OS_NAME IS '系统名称';
    COMMENT ON COLUMN SYS_LOGIN_LOG.BROWSER_NAME IS '浏览器';
    COMMENT ON COLUMN SYS_LOGIN_LOG.BROWSER_LOCALE IS '语言区域';
    COMMENT ON COLUMN SYS_LOGIN_LOG.BOOL_NEW_USER_ENUM IS '是否是新用户:[1=是=YES,;2=否=NO]max=2';
    COMMENT ON COLUMN SYS_LOGIN_LOG.LOGIN_ORIGIN_ENUM IS '登录来源:[1=WEB方式=WEB,;2=安卓APP=ANDROID, 3=苹果APP=IOS, 4=H5=H5, 5=微信小程序=WEIXIN_MINI_PROGRAM, 6=微信公众号=WEIXIN_OFFICIAL_ACCOUNT]max=6';
    COMMENT ON COLUMN SYS_LOGIN_LOG.CREATE_DATE IS '创建时间';
    COMMENT ON COLUMN SYS_LOGIN_LOG.CREATE_USER_ID IS '创建人';
    
    `);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await this.client.queryObject(`
            DROP table SYS_LOGIN_LOG
        `);
  }
}
