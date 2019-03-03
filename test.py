# tell linter to ignore docstring requirements:
# pylint: disable=C0111
# ignore redefine name from outer scope rule because
# it doesn't seem to work well with the fixtures system
# pylint: disable=W0621

import os
import time
import datetime

import pytest
from selenium import webdriver

# I usually use the directory of the current file
# but this time to mix it up I will use the current
# directory and only run it from the project root
APP_PATH = "file://%s/public/index.html" % os.getcwd()

@pytest.fixture()
def driver():
    _driver = webdriver.Chrome()
    yield _driver
    coverage_info = _driver.execute_script('return JSON.stringify(window.__coverage__);')
    # each report needs a unique name
    # but we don't care for this example which report corresponds
    # to which test
    timestamp = datetime.datetime.timestamp(datetime.datetime.now())
    file = open("nyc_output/coverage%s.json" % timestamp, 'w')
    file.write(coverage_info)
    file.close()
    _driver.close()

@pytest.mark.parametrize("english,spanish", [
    ("hello", "HOLA"), # test a RANDOM one that should exist
    ("ltesww", "NO SE"), # test one that does not exist
])

def test_translation(english, spanish, driver):
    driver.get(APP_PATH)
    time.sleep(1)
    assert spanish not in driver.page_source, 'control'
    driver.find_element_by_id('word').send_keys(english)
    driver.find_element_by_xpath('//input[@type="submit" and @value="translate"]').click()
    time.sleep(1)
    assert spanish in driver.page_source
