from setuptools import (setup, find_packages)

setup(
    name='remainder',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'flask',
        'Flask-SQLAlchemy',
        'flask-cors'
    ]
)