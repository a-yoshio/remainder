from setuptools import (setup, find_packages)

setup(
    name='remainder_application',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'flask',
        'Flask-SQLAlchemy',
        'flask-cors',
        'python-dotenv'
    ]
)