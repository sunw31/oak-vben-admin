import { AbstractMigration, ClientPostgreSQL } from "../../deps.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await this.client.queryObject(`
    DROP TABLE IF EXISTS SYS_BANNER;
CREATE TABLE SYS_BANNER(
    ID BIGINT NOT NULL,
    BANNER_TITLE VARCHAR(50) NOT NULL,
    BANNER_DESCRIPTION VARCHAR(250),
    BANNER_CODE VARCHAR(100),
    COVER_PC_IMAGE_URL VARCHAR(500),
    COVER_H5_IMAGE_URL VARCHAR(500),
    BANNER_STAND_DATE NUMERIC(18,2) NOT NULL DEFAULT  '2.5',
    BANNER_JUMP_TYPE_ENUM SMALLINT NOT NULL DEFAULT  '1',
    JUMP_H5_URL VARCHAR(500),
    JUMP_PC_URL VARCHAR(500),
    JUMP_TYPE_CODE VARCHAR(50),
    JUMP_OBJECT_ID BIGINT,
    RANKING SMALLINT NOT NULL DEFAULT  '100',
    DELETE_ENUM SMALLINT NOT NULL DEFAULT  '1',
    TENANT_ID BIGINT NOT NULL DEFAULT  '1',
    CREATE_DATE BIGINT NOT NULL,
    CREATE_USER_ID BIGINT NOT NULL,
    UPDATE_DATE BIGINT NOT NULL,
    UPDATE_USER_ID BIGINT NOT NULL,
    DELETE_DATE BIGINT,
    DELETE_USER_ID BIGINT,
    PRIMARY KEY (ID)
);

COMMENT ON TABLE SYS_BANNER IS '';
COMMENT ON COLUMN SYS_BANNER.ID IS '主键ID';
COMMENT ON COLUMN SYS_BANNER.BANNER_TITLE IS '标题:likeParam';
COMMENT ON COLUMN SYS_BANNER.BANNER_DESCRIPTION IS '介绍';
COMMENT ON COLUMN SYS_BANNER.BANNER_CODE IS '编码:oneParam;listParam';
COMMENT ON COLUMN SYS_BANNER.COVER_PC_IMAGE_URL IS 'PC封面图片';
COMMENT ON COLUMN SYS_BANNER.COVER_H5_IMAGE_URL IS '移动端封面图片';
COMMENT ON COLUMN SYS_BANNER.BANNER_STAND_DATE IS '停留时间:支持小数';
COMMENT ON COLUMN SYS_BANNER.BANNER_JUMP_TYPE_ENUM IS '跳转类型:[1=对象ID=OBJECT_ID,;2=URL=URL]max=2';
COMMENT ON COLUMN SYS_BANNER.JUMP_H5_URL IS '移动端跳转url地址';
COMMENT ON COLUMN SYS_BANNER.JUMP_PC_URL IS 'PC端跳转url地址';
COMMENT ON COLUMN SYS_BANNER.JUMP_TYPE_CODE IS '跳转业务类型编码:oneParam';
COMMENT ON COLUMN SYS_BANNER.JUMP_OBJECT_ID IS '跳转业务ID:foreignKey';
COMMENT ON COLUMN SYS_BANNER.RANKING IS '排序:排序值越小越排前;max=100';
COMMENT ON COLUMN SYS_BANNER.DELETE_ENUM IS '删除状态:[1=未删除=NOT_DELETED,;2=已删除=DELETED]max=2';
COMMENT ON COLUMN SYS_BANNER.TENANT_ID IS '所属租户';
COMMENT ON COLUMN SYS_BANNER.CREATE_DATE IS '创建时间';
COMMENT ON COLUMN SYS_BANNER.CREATE_USER_ID IS '创建人';
COMMENT ON COLUMN SYS_BANNER.UPDATE_DATE IS '更新时间';
COMMENT ON COLUMN SYS_BANNER.UPDATE_USER_ID IS '更新人';
COMMENT ON COLUMN SYS_BANNER.DELETE_DATE IS '删除时间';
COMMENT ON COLUMN SYS_BANNER.DELETE_USER_ID IS '删除人';

    
    `);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await this.client.queryObject(`
            DROP table SYS_BANNER
        `);
  }
}
