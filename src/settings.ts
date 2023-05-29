import * as path from 'path'

export const SRC_DIR = path.dirname(__filename)
export const PROJECT_DIR = path.dirname(SRC_DIR)

export const ENV_LOCAL_PATH = path.join(PROJECT_DIR, '.env')


export const PUPPET_USE_WECHAT4U = false
export const PUPPET_USE_PAD = true
