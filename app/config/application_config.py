import os
# 環境名（development, testing, default）
ENV_NAME = 'development'

# 基本的な設定はバージョン管理下のconfig.pyにオブジェクトとして記載
config = {
    "development": "app.config.develop_config",
    "testing": "app.config.test_config",
    "default": "app.config.default"
}

def configure_app(app):
    # 環境変数を利用して読み込む設定ファイルを決定
    config_name = os.getenv('FLASK_CONFIGURATION', ENV_NAME)

    # 設定はオブジェクトとして読み込む
    app.config.from_object(config[config_name])

    # センシティブな設定はインスタンスフォルダ内の設定で上書きする
    app.config.from_pyfile('../instance/config.py', silent=True)